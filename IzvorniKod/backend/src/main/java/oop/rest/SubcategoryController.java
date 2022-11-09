package oop.rest;

import oop.domain.Subcategory;
import oop.service.SubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Subcategory> createSubcategory(@RequestBody Subcategory subcategory){
        Subcategory saved = service.createSubcategory(subcategory);
        return ResponseEntity.created(URI.create("/subcategory/" + saved.getSubCategoryNameForPath())).body(saved);
    }
    @PutMapping("/{subcategoryName}")
    @Secured("ROLE_ADMIN")
    public Subcategory updateSubcategory(@PathVariable("subcategoryName") String subcategoryName, @RequestBody Subcategory subcategory){
        if(!subcategory.getSubcategoryName().equals(subcategoryName)){
            throw new IllegalArgumentException("Subcategory name must be preserved");
        }
        return service.updateSubcategory(subcategory);
    }
}
