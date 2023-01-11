package oop.rest;

import oop.domain.Category;
import oop.domain.Subcategory;
import oop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/category")
@PropertySource(value = "classpath:application.properties")
public class CategoryController {
    @Autowired
    private CategoryService service;

    // Izlistaj sve kategorije
    @GetMapping("")
    public List<Category> listCategory(){
        return service.listAll();
    }

    // Izlistaj podkategoriju po imenu
    // Pomalo beskorisna funkcija
    @GetMapping("/{categoryName}")
    public Category getCategoryByName(@PathVariable("categoryName") String categoryName){
        return service.getCategoryByName(categoryName).get();
    }

    // Dodaj kategoriju
    @PostMapping("")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        Category saved = service.createCategory(category);
        return ResponseEntity.created(URI.create("/category/" + saved.getCategoryName())).body(saved);
    }
    // Update kategoriju
    @PutMapping("/{categoryName}")
    @Secured("ROLE_ADMIN")
    public Category updateCategory(@PathVariable("categoryName") String categoryName, @RequestBody Category category){
        if(!category.getCategoryName().equals(categoryName)){
            throw new IllegalArgumentException("Category name must be preserved");
        }
        return service.updateCategory(category);
    }
    // Obriši kategoriju pomoću id-a ili objekta
    @DeleteMapping("/{categoryName}")
    @Secured("ROLE_ADMIN")
    public Category deleteCategory(@PathVariable("categoryName") String name) {
        return service.deleteCategory(name);
    }

    @DeleteMapping
    @Secured("ROLE_ADMIN")
    public Category delete(@RequestBody Category category){
        return service.delete(category);
    }
}
