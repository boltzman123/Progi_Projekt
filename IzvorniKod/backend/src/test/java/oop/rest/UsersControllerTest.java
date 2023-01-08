package oop.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import oop.domain.Users;
import oop.rest.classes.LoginForm;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;




@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class UsersControllerTest {
    @Autowired
    private MockMvc mvc;


    @Test
    public void testExistingUser() throws Exception{
        Users user = new Users("kidkid24799@gmail.com", "kid", "kid", "kid", "kid");

        mvc.perform( MockMvcRequestBuilders
                        .post("/users")
                        .characterEncoding("utf-8")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(user))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());

    }

    @Test
    public void testLoginFail() throws Exception {
        LoginForm nova = new LoginForm("krivi@gmail.com", "krivi123");

        mvc.perform( MockMvcRequestBuilders
                        .post("/users/login")
                        .characterEncoding("utf-8")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(nova))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @Test
    public void testLogin() throws Exception {

        LoginForm nova = new LoginForm("kidkid24799@gmail.com", "dikdik123");

        mvc.perform( MockMvcRequestBuilders
                        .post("/users/login")
                        .characterEncoding("utf-8")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(nova))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().is2xxSuccessful());
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
