package oop.service;

import oop.domain.Subcategory;

import java.util.List;

public interface SubcategoryService {
    List<Subcategory> listAll();
    Subcategory createSubcategory(Subcategory subcategory);
    Subcategory updateSubcategory(Subcategory subcategory);
}
