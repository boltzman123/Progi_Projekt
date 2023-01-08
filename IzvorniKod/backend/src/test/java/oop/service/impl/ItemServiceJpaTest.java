package oop.service.impl;

import liquibase.pro.packaged.A;
import oop.domain.Category;
import oop.domain.Item;
import oop.domain.Subcategory;
import oop.service.EntityMissingException;
import oop.service.ItemService;
import oop.service.SubcategoryService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class ItemServiceJpaTest {

    @Autowired
    private ItemService itemService;

    @Autowired
    private SubcategoryService subcategoryService;

    @Test
    public void test5() {
        Subcategory subcategory = subcategoryService.getSubcategoryByName("Lutke").get();
        Category category = subcategory.getCategory();
        Item createdItem = itemService.createItem(new Item("jadbh", "kadna", (long) 200, "akdn", 2, 'M', category, subcategory));
        createdItem.setForSex('F');
        Assertions.assertEquals('F', itemService.updateItem(createdItem).getForSex());
    }

    @Test
    public void test6() {
        Subcategory subcategory = subcategoryService.getSubcategoryByName("Lutke").get();
        Category category = subcategory.getCategory();
        Item createdItem = itemService.createItem(new Item("jadbh", "kadna", (long) 200, "akdn", 2, 'M', category, subcategory));
        Long id = createdItem.getId();
        itemService.delete(createdItem);
        Throwable exception = Assertions.assertThrows(EntityMissingException.class, ()->itemService.getItemById(id));
        Assertions.assertEquals(exception.getMessage() ,String.format("Entity with reference %d of class oop.domain.Item not found.", id));


    }

}