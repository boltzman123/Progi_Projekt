package oop.service;

import oop.domain.Category;
import oop.domain.Child;

import java.util.List;

public interface CategoryService {
    List<Category> listAll();
    Category createCategory(Category category);
    Category updateCategory(Category category);
}
