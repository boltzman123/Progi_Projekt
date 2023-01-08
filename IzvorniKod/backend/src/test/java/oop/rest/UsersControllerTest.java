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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import ru.yandex.qatools.embed.postgresql.EmbeddedPostgres;

import javax.persistence.ManyToOne;
import java.sql.Connection;
import java.sql.DriverManager;

import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.client.ExpectedCount.times;
import static ru.yandex.qatools.embed.postgresql.distribution.Version.Main.V9_6;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class UsersControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private UsersService userService;

    @Autowired
    private ChildService childService;

    @Autowired
    private DonationService donationService;

    @Autowired
    private EmailSenderService senderService;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @Test
    public void proba() {
        //Users user = new Users("hehe@gmail.com", "hehe", "hehe", "hehe", "hehe");


        //userService.createUser(user);
        System.out.println(userService.listAll());
        userService.listAll().forEach(u -> System.out.println(u.getEmail()));
    }


    @Test
    //@WithMockUser(username="admin", password = "pass")
    public void probaloginTest() throws Exception {

        Users user = new Users("hehe@gmail.com", "hehe", "hehe", "hehe", "hehe");
        userService.createUser(user);

        LoginForm nova = new LoginForm("hehe@gmail.com", "hehe");

        System.out.println(user.getEmail() + " " + user.getPassword());
        System.out.println(nova.getEmail() + " " + nova.getPassword());

        mvc.perform( MockMvcRequestBuilders
                        .post("/api/users/login")
                        .characterEncoding("utf-8")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(nova))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
