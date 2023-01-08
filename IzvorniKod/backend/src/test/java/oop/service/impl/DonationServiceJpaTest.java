package oop.service.impl;

import oop.domain.*;
import oop.service.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

@RunWith(SpringRunner.class)
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
    public void tets1() {
        Users user = usersService.fetch("kidkid24799@gmail.com");
        Subcategory subcategory = subcategoryService.getSubcategoryByName("Lutke").get();
        Category category = subcategory.getCategory();
        Item item = itemService.createItem(new Item("kjasd", "kasjn", (long) 2000, "kjaxn", 3, 'M', category, subcategory));
        Donation don = new Donation("jhadb", new Date(2000, 12, 12), "kasn", "lasknl", "kdajsn", "laidn", user, item);


        Assertions.assertEquals(service.createDonation(don), don);
    }

    @Test
    public void tets2(){

        Users user = usersService.fetch("kidkid24799@gmail.com");
        Subcategory subcategory = subcategoryService.getSubcategoryByName("Lutke").get();
        Category category = subcategory.getCategory();
        Item item = itemService.createItem(new Item("kjasd", "kasjn", (long) 2000, "kjaxn", 3, 'M', category, subcategory));
        Donation don = new Donation("jhadb", new Date(2000, 12, 12), "kasn", "lasknl", "kdajsn", "laiIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršaIspitni slučajevi se pišu na razini jezika izvornog koda i izvršadn", user, item);

        Throwable exception = Assertions.assertThrows(DataIntegrityViolationException.class, ()->service.createDonation(don));
        Assertions.assertEquals(exception.getMessage(), "could not execute statement; SQL [n/a]; nested exception is org.hibernate.exception.DataException: could not execute statement");
    }

}