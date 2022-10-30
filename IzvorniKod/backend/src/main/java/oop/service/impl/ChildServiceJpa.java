package oop.service.impl;

import oop.dao.ChildRepository;
import oop.domain.Child;
import oop.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChildServiceJpa implements ChildService {
    @Autowired
    private ChildRepository repository;
    @Override
    public List<Child> listAll() {
        return repository.findAll();
    }

    @Override
    public Child createChild(Child child) {
        return repository.save(child);
    }

    @Override
    public Child updateChild(Child child) {
        return repository.save(child);
    }
}
