package oop.service.impl;

import oop.dao.UsersRepository;
import oop.domain.Users;
import oop.service.EntityMissingException;
import oop.service.UsersService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;


@ExtendWith(SpringExtension.class)
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
    public void TestIsAdminInDatabase() {
        Users users = usersService.fetch("admin");
        Assertions.assertEquals(passwordEncoder.matches("pass", users.getPassword()), true);
    }

    @Test
    public void TestEntityMissingException() {
        Throwable exception = Assertions.assertThrows(EntityMissingException.class, ()->usersService.fetch("ksj@gmai.com"));
        Assertions.assertEquals(exception.getMessage() ,"Entity with reference ksj@gmai.com of class oop.domain.Users not found.");
    }

}