package oop.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import liquibase.pro.packaged.M;
import oop.MnDjecaZaDjecuApplication;
import oop.dao.*;
import oop.domain.Users;
import oop.rest.classes.LoginForm;
import oop.service.ChildService;
import oop.service.DonationService;
import oop.service.EmailSenderService;
import oop.service.UsersService;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import ru.yandex.qatools.embed.postgresql.EmbeddedPostgres;

import javax.persistence.ManyToOne;
import java.sql.Connection;
import java.sql.DriverManager;

import static org.mockito.Mockito.doNothing;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.client.ExpectedCount.times;
import static ru.yandex.qatools.embed.postgresql.distribution.Version.Main.V9_6;


@RunWith(SpringRunner.class)
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
