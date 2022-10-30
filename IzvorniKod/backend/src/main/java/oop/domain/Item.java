package oop.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Item {
    @Id
    private Long id;
    private String productName;
    private String itemState;
    private Long productionYear;
    private String productBrand;
    private int forAge;
    private String forSex;
    @ManyToOne
    @JoinColumn(name = "category_name")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "subcategory_name")
    private Subcategory subcategory;

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

    public String getForSex() {
        return forSex;
    }

    public void setForSex(String forSex) {
        this.forSex = forSex;
    }
}
