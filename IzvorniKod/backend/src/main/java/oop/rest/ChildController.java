package oop.rest;

import oop.domain.Child;
import oop.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/child")
public class ChildController {
    @Autowired
    private ChildService service;

    @GetMapping("")
    public List<Child> listChildren(){
        return service.listAll();
    }
    @PostMapping("")
    public ResponseEntity<Child> createChild(@RequestBody Child child){
        Child saved = service.createChild(child);
        return ResponseEntity.created(URI.create("/child/" + saved.getChildId())).body(saved);
    }
    @PutMapping("")
    public Child updateChild(@PathVariable("id") Long id, @RequestBody Child child){
        if(!child.getChildId().equals(id)){
            throw new IllegalArgumentException("Child id must be preserved");
        }
        return service.updateChild(child);
    }
}
