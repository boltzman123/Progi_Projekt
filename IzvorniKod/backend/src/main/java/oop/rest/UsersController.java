package oop.rest;

import oop.domain.Users;
import oop.rest.classes.LoginForm;
import oop.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/users")
@PropertySource(value = "classpath:application.properties")
public class UsersController {
    @Autowired
    private UsersService userService;

    @GetMapping("")
    //@Secured("ROLE_ADMIN")
    public List<Users> listUsers(){
        return userService.listAll();
    }

    @GetMapping("/{email}")
    public Users getUser(@PathVariable("email") String email){
        return userService.fetch(email);
    }
    @GetMapping("/login")
    public Users getUser(@RequestBody LoginForm loginForm){
        Users user = userService.fetch(loginForm.getEmail());
        if(user.getPassword().equals(loginForm.getPassword())){
            return user;
        } else{
            throw new UsernameNotFoundException("Email or password is wrong");
        }
    }

    @PostMapping("")
    //@Secured("ROLE_ADMIN")
    public ResponseEntity<Users> createUser(@RequestBody Users user){
        Users saved = userService.createUser(user);
        return ResponseEntity.created(URI.create("/users/" + saved.getEmail())).body(saved);
    }

    @PutMapping("/{email}")
    public Users updateUser(@PathVariable("email") String email, @RequestBody Users user) {
        if (!user.getEmail().equals(email))
            throw new IllegalArgumentException("User email must be preserved");
        return userService.updateUser(user);
    }

    @DeleteMapping("/{email}")
    //@Secured("ROLE_ADMIN")
    public Users deleteUser(@PathVariable("email") String email) {
        return userService.deleteUser(email);
    }

}
