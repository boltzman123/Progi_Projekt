package oop.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
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
    private float useDateExpires;
    @Enumerated(EnumType.STRING)
    private Season season;
    @JsonIgnore
    @ManyToMany(mappedBy = "subcategory")
    private Set<Child> childrenSub = new HashSet<>();
    public Subcategory(){}

    public Subcategory(String subCategoryName, Category category, Season season, float useDateExpires) {
        this.subcategoryName = subCategoryName;
        this.category = category;
        this.useDateExpires = useDateExpires;
        this.season = season;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public float getUseDateExpires() {
        return useDateExpires;
    }

    public void setUseDateExpires(float useDateExpires) {
        this.useDateExpires = useDateExpires;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public String getSubcategoryName() {
        return subcategoryName;
    }

    public void setSubcategoryName(String subcategoryName) {
        this.subcategoryName = subcategoryName;
    }

    public Set<Child> getChildrenSub() {
        return childrenSub;
    }
    public void setChildrenSub(Set<Child> childrenSub) {
        this.childrenSub = childrenSub;
    }
}
