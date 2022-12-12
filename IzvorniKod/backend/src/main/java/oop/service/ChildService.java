package oop.service;

import oop.domain.Child;

import java.util.List;
import java.util.Optional;

public interface ChildService {
    List<Child> listAll();
    List<Child> listChildByUser(String email);
    Optional<Child> listChildByUserAndId(String email, Long id);
    Child createChild(Child child);
    Child updateChild(Child child);
    Child deleteChild(Child child);
}
