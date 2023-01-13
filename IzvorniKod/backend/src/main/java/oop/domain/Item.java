package oop.domain;

import javax.persistence.*;

@Entity
public class Item {
    @Id
    @GeneratedValue
    private Long id;
    private String productName;
    private String itemState;
    private Long productionYear;
    private String productBrand;
    private int forAge;
    private char forSex;
    @ManyToOne
    @JoinColumn(name = "category_name")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "subcategory_name")
    private Subcategory subcategory;

    public Item() {}
    public Item(String productName, String itemState, Long productionYear, String productBrand, int forAge, char forSex, Category category, Subcategory subcategory) {
        this.productName = productName;
        this.itemState = itemState;
        this.productionYear = productionYear;
        this.productBrand = productBrand;
        this.forAge = forAge;
        this.forSex = forSex;
        this.category = category;
        this.subcategory = subcategory;
    }

    public Subcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Subcategory subcategory) {
        this.subcategory = subcategory;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getItemState() {
        return itemState;
    }

    public void setItemState(String itemState) {
        this.itemState = itemState;
    }

    public Long getProductionYear() {
        return productionYear;
    }

    public void setProductionYear(Long productionYear) {
        this.productionYear = productionYear;
    }

    public String getProductBrand() {
        return productBrand;
    }

    public void setProductBrand(String productBrand) {
        this.productBrand = productBrand;
    }

    public int getForAge() {
        return forAge;
    }

    public void setForAge(int forAge) {
        this.forAge = forAge;
    }

    public char getForSex() {
        return forSex;
    }

    public void setForSex(char forSex) {
        this.forSex = forSex;
    }

}
