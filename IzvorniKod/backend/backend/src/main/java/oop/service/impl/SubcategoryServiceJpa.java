package oop.service.impl;

import oop.dao.SubcategoryRepository;
import oop.domain.Subcategory;
import oop.service.EntityMissingException;
import oop.service.SubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Optional<Subcategory> getSubcategoryByName(String name) {
        return repository.findById(name);
    }
    @Override
    public Subcategory deleteSubcategory(String name){
        Subcategory subcategory = getSubcategoryByName(name).get();
        repository.delete(subcategory);
        return subcategory;
    }
    @Override
    public Subcategory delete(Subcategory subcategory){
        repository.delete(subcategory);
        return subcategory;
    }
}
