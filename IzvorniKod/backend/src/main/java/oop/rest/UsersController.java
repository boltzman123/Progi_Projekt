package oop.rest;

import liquibase.pro.packaged.R;
import oop.domain.Child;
import oop.domain.Donation;
import oop.domain.Users;
import oop.rest.classes.LoginForm;
import oop.service.ChildService;
import oop.service.DonationService;
import oop.service.EmailSenderService;
import oop.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@PropertySource(value = "classpath:application.properties")
public class UsersController {
    @Autowired
    private UsersService userService;

    @Autowired
    private ChildService childService;
    @Autowired
    private DonationService donationService;
    @Autowired
    private EmailSenderService senderService;

    @Autowired
    ApplicationEventPublisher eventPublisher;

    @Autowired
    private PasswordEncoder passwordEncoder;
    // Dohvati sve usere
    @GetMapping("")
    @Secured("ROLE_ADMIN")
    public List<Users> listUsers(){
        return userService.listAll();
    }

    // Dohvati usera po emailu i passwordu
    @GetMapping("/{email}/{password}")
    public Users getUser(@PathVariable("email") String email, @PathVariable("password") String password){
        Users user =userService.fetch(email);
        if(passwordEncoder.matches(password, user.getPassword())){
            return user;
        } else{
            throw new UsernameNotFoundException("Email or password is wrong");
        }
    }
    @GetMapping("/{email}")
    public Users getUserByUsername(@PathVariable String email){
        return userService.fetch(email);
    }


    // Login te vraća inforamcije o useru
    @PostMapping("/login")
    public ResponseEntity<Users> getUser(@RequestBody LoginForm loginForm){
        Users user = userService.fetch(loginForm.getEmail());
        //System.out.println(loginForm.getEmail() + " " + loginForm.getPassword());
        //System.out.println(user.getEmail() + " " + passwordEncoder.matches(loginForm.getPassword(), user.getPassword()));
        if(passwordEncoder.matches(loginForm.getPassword(), user.getPassword())){
            return ResponseEntity.created(URI.create("/users/" + user.getEmail())).body(user);
        } else{
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }
    // Registracija, slanje potvrde na mail, vraća objekt novostvorenog usera
    @PostMapping("")
    public ResponseEntity<Users> createUser(@RequestBody Users user){
        Optional<Users> user1 = userService.findByEmail(user.getEmail());
        if(user1.isPresent()){
            //System.out.println("da");
            throw new IllegalArgumentException("User already exists");
        } else{
            //System.out.println("ne");
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            String email = user.getEmail();
            String subject = "Successful registration!";
            try{
                senderService.sendEmail(email,
                        subject, user.generateRegistrationMessage());
                user.setMailSent(true);
            } catch(Exception e) {
                user.setMailSent(false);
            }
            Users saved = userService.createUser(user);
            return ResponseEntity.created(URI.create("/users/" + saved.getEmail())).body(saved);
        }
    }
    // Update usera
    @PutMapping("/{email}")
    public Users updateUser(@PathVariable("email") String email, @RequestBody Users user) {
        if (!user.getEmail().equals(email))
            throw new IllegalArgumentException("User email must be preserved");
        return userService.updateUser(user);
    }
    // Obrisi usera po id-u ili objektu
    @DeleteMapping("/{email}")
    public Users deleteUser(@PathVariable("email") String email) {
        List<Child> children = childService.listChildByUser(email);
        for(Child c: children){
            childService.deleteChild(c);
        }
        List<Donation> donations = donationService.listByUser(email);
        for(Donation d: donations){
            donationService.delete(d);
        }
        return userService.deleteUser(email);
    }


}
