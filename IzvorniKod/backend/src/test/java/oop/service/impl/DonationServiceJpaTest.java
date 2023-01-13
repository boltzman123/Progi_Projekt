package oop.service.impl;

import oop.domain.*;
import oop.service.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class DonationServiceJpaTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UsersService usersService;

    @Autowired
    private SubcategoryService subcategoryService;

    @Autowired
    private DonationService service;

    @Autowired
    private ItemService itemService;

    @Autowired
    private ChildService childService;

    @Autowired
    private UploadService uploadService;


    @Test
    public void testIsDonationCreated() {
        Users user = usersService.fetch("kidkid24799@gmail.com");
        Subcategory subcategory = subcategoryService.getSubcategoryByName("Lutke").get();
        Category category = subcategory.getCategory();
        Item item = itemService.createItem(new Item("kjasd", "kasjn", (long) 2000, "kjaxn", 3, 'M', category, subcategory));
        Donation don = new Donation("jhadb", new Date(2000, 12, 12), "kasn", "lasknl", "kdajsn", "laidn", user, item);


        Assertions.assertEquals(service.createDonation(don), don);
    }

}