package oop.service.impl;

import oop.dao.CategoryRepository;
import oop.domain.Category;
import oop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
