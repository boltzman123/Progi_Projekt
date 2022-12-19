package oop.service.impl;

import oop.dao.CategoryRepository;
import oop.domain.Category;
import oop.domain.Subcategory;
import oop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceJpa implements CategoryService {
    @Autowired
    private CategoryRepository repository;
    @Override
    public List<Category> listAll() {
        return repository.findAll();
    }

    @Override
    public Category createCategory(Category category) {
        return repository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return repository.save(category);
    }

    @Override
    public Optional<Category> getCategoryByName(String name) {
        return repository.findById(name);
    }
    @Override
    public Category deleteCategory(String name){
        Category category = getCategoryByName(name).get();
        repository.delete(category);
        return category;
    }
    @Override
    public Category delete(Category category){
        repository.delete(category);
        return category;
    }
}
