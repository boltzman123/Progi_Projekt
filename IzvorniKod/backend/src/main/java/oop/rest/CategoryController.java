package oop.rest;

import oop.domain.Category;
import oop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Category> createCategory(@RequestBody Category Category){
        Category saved = service.createCategory(Category);
        return ResponseEntity.created(URI.create("/category/" + saved.getCategoryName())).body(saved);
    }
    @PutMapping("")
    public Category updateCategory(@PathVariable("categoryName") String categoryName, @RequestBody Category Category){
        if(!Category.getCategoryName().equals(categoryName)){
            throw new IllegalArgumentException("Category name must be preserved");
        }
        return service.updateCategory(Category);
    }
}
