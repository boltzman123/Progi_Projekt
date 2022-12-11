package oop.service;

import oop.domain.Category;
import oop.domain.Child;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> listAll();
    Category createCategory(Category category);
    Category updateCategory(Category category);
    Optional<Category> getCategoryByName(String name);
    Category deleteCategory(String name);
    Category delete(Category category);
}
