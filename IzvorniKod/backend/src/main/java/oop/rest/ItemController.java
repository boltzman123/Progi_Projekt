package oop.rest;

import oop.domain.Item;
import oop.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Autowired
    private ItemService service;

    @GetMapping("")
    @Secured("ROLE_ADMIN")
    public List<Item> listItem(){
        return service.listAll();
    }
    @PostMapping("")
    public ResponseEntity<Item> createItem(@RequestBody Item item){
        Item saved = service.createItem(item);
        return ResponseEntity.created(URI.create("/item/" + saved.getId())).body(saved);
    }
    @PutMapping("/{id}")
    public Item updateItem(@PathVariable("id") Long id, @RequestBody Item item){
        if(!item.getId().equals(id)){
            throw new IllegalArgumentException("Item id must be preserved");
        }
        return service.updateItem(item);
    }
}
