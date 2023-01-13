package oop.rest;

import oop.domain.Child;
import oop.domain.Users;
import oop.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/child")
@PropertySource(value = "classpath:application.properties")
public class ChildController {
    @Autowired
    private ChildService service;

    // Izlistaj svu djecu
    @GetMapping("")
    @Secured("ROLE_ADMIN")
    public List<Child> listChildren(){
        return service.listAll();
    }

    // Izlistaj djecu jednog usera
    @GetMapping("/{email}")
    public List<Child> listChildrenByUser(@PathVariable String email){
        return service.listChildByUser(email);
        // return service.listAll().stream().filter(c -> c.getUser().getEmail().equals(email)).collect(Collectors.toList());
    }

    // Nađi dijete po mailu usera i id-u djeteta
    @GetMapping("/{email}/{id}")
    public Optional<Child> listChild(@PathVariable("email") String email, @PathVariable("id") Long id){
        return service.listChildByUserAndId(email, id);
    }

    // Stvori dijete (ne tako!)
    @PostMapping("")
    public ResponseEntity<Child> createChild(@RequestBody Child child){
        Child saved = service.createChild(child);
        return ResponseEntity.created(URI.create("/child/" + saved.getChildId())).body(saved);
    }

    // Update-aj dijete
    @PutMapping("/{email}/{id}")
    public Child updateChild(@PathVariable("email") String email,@PathVariable("id") Long id, @RequestBody Child child){
        if(!child.getChildId().equals(id) && !child.getUser().getEmail().equals(email)){
            throw new IllegalArgumentException("Child id or/and email must be preserved");
        }
        return service.updateChild(child);
    }
    // Brisi djecu
    @DeleteMapping("")
    public Child deleteChild(@RequestBody Child child) {
        return service.deleteChild(child);
    }
}
