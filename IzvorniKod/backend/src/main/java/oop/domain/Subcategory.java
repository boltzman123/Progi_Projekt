package oop.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Subcategory {
    @Id
    private String subcategoryName;

    @ManyToOne
    @JoinColumn(name = "category_name")
    @NotNull
    private Category category;
    private int itemDuration;
    @JsonIgnore
    @ManyToMany(mappedBy = "subcategory")
    private Set<Child> childrenSub = new HashSet<>();
    public Subcategory(){}

    public Subcategory(String subCategoryName, Category category, int itemDuration) {
        this.subcategoryName = subCategoryName;
        this.category = category;
        this.itemDuration = itemDuration;
    }

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

    public String getSubcategoryName() {
        return subcategoryName;
    }

    public void setSubcategoryName(String subcategoryName) {
        this.subcategoryName = subcategoryName;
    }

    public String getSubCategoryNameForPath(){
        return this.subcategoryName.replaceAll("\\s+","");
    }
    public Set<Child> getChildrenSub() {
        return childrenSub;
    }
    public void setChildrenSub(Set<Child> childrenSub) {
        this.childrenSub = childrenSub;
    }
}
