package oop.service.impl;

import oop.dao.UsersRepository;
import oop.domain.Users;
import oop.service.EntityMissingException;
import oop.service.UsersService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class UsersServiceJpaTest {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private UsersService usersService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void Test3() {
        Users users = usersService.fetch("admin");
        Assertions.assertEquals(passwordEncoder.matches("pass", users.getPassword()), true);
    }

    @Test
    public void Test4() {
        Throwable exception = Assertions.assertThrows(EntityMissingException.class, ()->usersService.fetch("ksj@gmai.com"));
        Assertions.assertEquals(exception.getMessage() ,"Entity with reference ksj@gmai.com of class oop.domain.Users not found.");
    }

}