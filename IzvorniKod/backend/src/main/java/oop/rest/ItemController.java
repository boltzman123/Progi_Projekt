package oop.rest;

import oop.domain.Item;
import oop.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/item")
@PropertySource(value = "classpath:application.properties")
public class ItemController {
    @Autowired
    private ItemService service;

    // Izlistaj sve iteme
    @GetMapping("")
    @Secured({"ROLE_ADMIN"})
    public List<Item> listItem(){
        return service.listAll();
    }

    // Stvori novi item
    @PostMapping("")
    public ResponseEntity<Item> createItem(@RequestBody Item item){
        Item saved = service.createItem(item);
        return ResponseEntity.created(URI.create("/item/" + saved.getId())).body(saved);
    }

    // Update-aj item
    @PutMapping("/{id}")
    public Item updateItem(@PathVariable("id") Long id, @RequestBody Item item){
        if(!item.getId().equals(id)){
            throw new IllegalArgumentException("Item id must be preserved");
        }
        return service.updateItem(item);
    }

    // Obriši item-e na 2 načina
    @DeleteMapping("/{id}")
    public Item deleteItem(@PathVariable("id") Long id){
        return service.deleteItemById(id);
    }

    @DeleteMapping
    public Item delete(@RequestBody Item item){
        service.delete(item);
        return item;
    }

}
