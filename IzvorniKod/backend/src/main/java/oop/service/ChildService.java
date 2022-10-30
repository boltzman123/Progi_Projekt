package oop.service;

import oop.domain.Child;
import oop.domain.Item;

import java.util.List;

public interface ChildService {
    List<Child> listAll();
    Child createChild(Child child);
    Child updateChild(Child child);
}
