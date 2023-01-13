package oop.service;

import oop.domain.Subcategory;

import java.util.List;
import java.util.Optional;

public interface SubcategoryService {
    List<Subcategory> listAll();
    Optional<Subcategory> getSubcategoryByName(String name);
    Subcategory createSubcategory(Subcategory subcategory);
    Subcategory updateSubcategory(Subcategory subcategory);
    Subcategory deleteSubcategory(String name);
    Subcategory delete(Subcategory subcategory);
}
