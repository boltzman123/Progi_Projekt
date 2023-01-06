package oop;

import oop.dao.CategoryRepository;
import oop.domain.Category;
import oop.service.CategoryService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UniteTesting {

    @Autowired
    private CategoryService service;

    @MockBean
    private CategoryRepository repository;

    @Test
    public void funkcija() {
        Category cat = new Category(null);
        assertEquals(Category.class, service.createCategory(cat));
        System.out.println("dadada");
    }

    @Test
    public void refistracija() {

    }

}
