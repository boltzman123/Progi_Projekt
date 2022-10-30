package oop.rest;

import oop.domain.Subcategory;
import oop.service.SubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/subcategory")
public class SubcategoryController {
    @Autowired
    private SubcategoryService service;

    @GetMapping("")
    public List<Subcategory> listSubcategory(){
        return service.listAll();
    }
    @PostMapping("")
    public ResponseEntity<Subcategory> createSubcategory(@RequestBody Subcategory Subcategory){
        Subcategory saved = service.createSubcategory(Subcategory);
        return ResponseEntity.created(URI.create("/subcategory/" + saved.getSubCategoryName())).body(saved);
    }
    @PutMapping("")
    public Subcategory updateSubcategory(@PathVariable("SubcategoryName") String SubcategoryName, @RequestBody Subcategory Subcategory){
        if(!Subcategory.getSubCategoryName().equals(SubcategoryName)){
            throw new IllegalArgumentException("Subcategory name must be preserved");
        }
        return service.updateSubcategory(Subcategory);
    }
}
