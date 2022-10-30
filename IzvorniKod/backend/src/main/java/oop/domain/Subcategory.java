package oop.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Subcategory {
    @Id
    private String subCategoryName;

    @ManyToOne
    @JoinColumn(name = "category_name")
    @NotNull
    private Category category;
    private int itemDuration;

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getItemDuration() {
        return itemDuration;
    }

    public void setItemDuration(int itemDuration) {
        this.itemDuration = itemDuration;
    }

    public String getSubCategoryName() {
        return subCategoryName;
    }

    public void setSubCategoryName(String subCategoryName) {
        this.subCategoryName = subCategoryName;
    }


}
