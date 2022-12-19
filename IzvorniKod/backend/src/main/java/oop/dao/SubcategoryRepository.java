package oop.dao;

import oop.domain.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubcategoryRepository extends JpaRepository<Subcategory, String> {
    @Override
    Optional<Subcategory> findById(String s);
}
