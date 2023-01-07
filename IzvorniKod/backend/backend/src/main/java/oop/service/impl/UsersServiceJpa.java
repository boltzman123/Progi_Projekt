package oop.service.impl;

import oop.dao.UsersRepository;
import oop.domain.Users;
import oop.service.EntityMissingException;
import oop.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersServiceJpa implements UsersService {
    @Autowired
    private UsersRepository userRepository;

    @Override
    public List<Users> listAll() {
        return userRepository.findAll();
    }

    @Override
    public Users fetch(String email) {
        return findByEmail(email).orElseThrow(
                () -> new EntityMissingException(Users.class, email)
        );
    }

    @Override
    public Users createUser(Users user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<Users> findByEmail(String email) {
        return userRepository.findById(email);
    }

    @Override
    public Users updateUser(Users user) {
        return userRepository.save(user);
    }

    public Users deleteUser(String email){
        Users users = fetch(email);
        userRepository.delete(users);
        return users;
    }

    @Override
    public Users delete(Users user) {
        userRepository.delete(user);
        return user;
    }
}
