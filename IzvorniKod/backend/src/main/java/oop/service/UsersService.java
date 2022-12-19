package oop.service;

import oop.domain.Users;

import java.util.List;
import java.util.Optional;

public interface UsersService {
    List<Users> listAll();
    Users fetch(String email);
    Users createUser(Users user);
    Optional<Users> findByEmail(String email);
    Users updateUser(Users user);
    Users deleteUser(String email);
    Users delete(Users user);

}
