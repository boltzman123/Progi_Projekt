package oop.rest;


import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Profile("form-security")
@RestController
@RequestMapping("/user")
@PropertySource(value = "classpath:application.properties")
public class RolesController {

    @GetMapping
    public User getCurrentUserRole(@AuthenticationPrincipal User user) {
        return user;
    }
}
