package oop.rest;

import oop.domain.Users;
import oop.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

@Service
public class UsersDetailsService implements UserDetailsService {
    @Value("${progi.admin.password}")
    private String adminPasswordHash;

    @Autowired
    private UsersService service;

    @Override
    public UserDetails loadUserByUsername(String email){
        return new User(email, password(email), authorities(email));
    }

    private List<GrantedAuthority> authorities(String email) {

        if ("admin".equals(email)){
            return commaSeparatedStringToAuthorityList("ROLE_ADMIN");
        }

        Users user = service.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("No user '" + email + "'")
        );
        return commaSeparatedStringToAuthorityList("ROLE_USER");
    }

    private String password(String email){
        if("admin".equals(email)){
            return adminPasswordHash;
        }
        Users user = service.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("No user '" + email + "'")
        );
        return user.getPassword();
    }
}
