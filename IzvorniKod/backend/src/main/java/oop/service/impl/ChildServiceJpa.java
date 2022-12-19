package oop.service.impl;

import oop.dao.ChildRepository;
import oop.domain.Child;
import oop.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChildServiceJpa implements ChildService {
    @Autowired
    private ChildRepository repository;
    @Override
    public List<Child> listAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Child> listChildByUserAndId(String email, Long id) {
        return repository.findByUserAndChildId(email, id);
    }

    @Override
    public List<Child> listChildByUser(String email) {
        return repository.findByUser(email);
    }

    @Override
    public Child createChild(Child child) {
        return repository.save(child);
    }

    @Override
    public Child updateChild(Child child) {

        return repository.save(child);
    }

    @Override
    public Child deleteChild(Child child) {
        repository.delete(child);
        return child;
    }
}
