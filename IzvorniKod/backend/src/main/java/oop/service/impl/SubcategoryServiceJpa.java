package oop.service.impl;

import oop.dao.SubcategoryRepository;
import oop.domain.Subcategory;
import oop.service.SubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubcategoryServiceJpa implements SubcategoryService {
    @Autowired
     private SubcategoryRepository repository;
    @Override
    public List<Subcategory> listAll() {
        return repository.findAll();
    }

    @Override
    public Subcategory createSubcategory(Subcategory subcategory) {
        return repository.save(subcategory);
    }

    @Override
    public Subcategory updateSubcategory(Subcategory subcategory) {
        return repository.save(subcategory);
    }
}
