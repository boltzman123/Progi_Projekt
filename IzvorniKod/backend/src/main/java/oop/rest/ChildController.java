package oop.rest;

import oop.domain.Child;
import oop.domain.Users;
import oop.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/child")
public class ChildController {
    @Autowired
    private ChildService service;

    @GetMapping("")
    public List<Child> listChildren(){
        return service.listAll();
    }
    @GetMapping("/{email}/{id}")
    public Optional<Child> listChild(@PathVariable("email") String email, @PathVariable("id") Long id){
        return service.listChildByUserAndId(email, id);
    }
    @PostMapping("")
    public ResponseEntity<Child> createChild(@RequestBody Child child){
        Child saved = service.createChild(child);
        return ResponseEntity.created(URI.create("/child/" + saved.getChildId())).body(saved);
    }
    @PutMapping("/{email}/{id}")
    public Child updateChild(@PathVariable("email") String email,@PathVariable("id") Long id, @RequestBody Child child){
        if(!child.getChildId().equals(id) && !child.getUser().getEmail().equals(email)){
            throw new IllegalArgumentException("Child id or/and email must be preserved");
        }
        return service.updateChild(child);
    }
    @DeleteMapping("")
    @Secured("ROLE_USER")
    public Child deleteChild(@RequestBody Child child) {
        return service.deleteChild(child);
    }
}
