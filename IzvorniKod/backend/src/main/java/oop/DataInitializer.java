package oop;

import oop.dao.CategoryRepository;
import oop.dao.SubcategoryRepository;
import oop.domain.Category;
import oop.domain.Subcategory;
import oop.service.CategoryService;
import oop.service.SubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Component
public class DataInitializer {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private SubcategoryService subcategoryService;
    @EventListener
    public void appReady(ApplicationReadyEvent event){

        // Save categories and subcategories in database

        // Category Kolica
        Category category = makeCategory("Kolica");
        makeSubcategory("Kolica 3 u 1", category, 18);
        makeSubcategory("Manja kolica", category, 20);
        makeSubcategory("Velika kolica", category, 15);

        // Category #2, #3

    }

    private Category makeCategory(String categoryName){
        Category category = new Category(categoryName);
        categoryService.createCategory(category);
        return category;
    }
    public void makeSubcategory(String subcategoryName, Category category, int itemDuration){
         Subcategory subcategory = new Subcategory(subcategoryName, category, itemDuration);
         subcategoryService.createSubcategory(subcategory);
    }
}
