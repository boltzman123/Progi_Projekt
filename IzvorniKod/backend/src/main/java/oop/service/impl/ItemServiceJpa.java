package oop.service.impl;

import oop.dao.ItemRepository;
import oop.domain.Item;
import oop.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceJpa implements ItemService {
    @Autowired
    private ItemRepository repository;
    @Override
    public List<Item> listAll() {
        return repository.findAll();
    }

    @Override
    public Item createItem(Item item) {
        return repository.save(item);
    }

    @Override
    public Item updateItem(Item item) {
        return repository.save(item);
    }

}
