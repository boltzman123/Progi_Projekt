package oop.rest;

import oop.domain.Category;
import oop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService service;

    @GetMapping("")
    public List<Category> listCategory(){
        return service.listAll();
    }
    @PostMapping("")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        Category saved = service.createCategory(category);
        return ResponseEntity.created(URI.create("/category/" + saved.getCategoryName())).body(saved);
    }
    @PutMapping("/{categoryName}")
    @Secured("ROLE_ADMIN")
    public Category updateCategory(@PathVariable("categoryName") String categoryName, @RequestBody Category category){
        if(!category.getCategoryName().equals(categoryName)){
            throw new IllegalArgumentException("Category name must be preserved");
        }
        return service.updateCategory(category);
    }
}
