package oop.service;

import oop.domain.Item;
import oop.domain.Subcategory;

import java.util.List;

public interface ItemService {
    List<Item> listAll();
    Item createItem(Item item);
    Item updateItem(Item item);
}
