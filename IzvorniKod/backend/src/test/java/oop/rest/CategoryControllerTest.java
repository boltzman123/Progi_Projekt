package oop.rest;

import oop.service.CategoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(controllers = CategoryController.class)
class CategoryControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private CategoryService service;

    @Test
    public void test() {

    }


}