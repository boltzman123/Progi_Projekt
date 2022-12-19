package oop.domain;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Child{
    @Id
    @GeneratedValue
    private Long childId;
    private String childName;
    private char childSex;
    private int childAge;
    private Date predictedBirthDate;

    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "email")
    private Users user;
    @ManyToMany()
    @JoinTable(name = "CHILD_CATEGORY",
            joinColumns = {@JoinColumn(name = "child_id", referencedColumnName = "childId")},
            inverseJoinColumns = @JoinColumn(name = "category_name", referencedColumnName = "categoryName")
    )
    private Set<Category> category;
    @ManyToMany()
    @JoinTable(name = "CHILD_SUBCATEGORY",
            joinColumns = {@JoinColumn(name = "child_id", referencedColumnName = "childId")},
            inverseJoinColumns = @JoinColumn(name = "subcategory", referencedColumnName = "subcategoryName")
    )
    private Set<Subcategory> subcategory;
    @Id
    @ManyToOne
    public void setUser(Users user){
        this.user = user;
    }
    public void addCategory(Category category){
        this.category.add(category);
    }
    public Users getUser() {
        return user;
    }
    public Long getChildId() {
        return childId;
    }
    public String getChildName() {
        return childName;
    }
    public void setChildName(String childName) {
        this.childName = childName;
    }
    public char getChildSex() {
        return childSex;
    }
    public void setChildSex(char childSex) {
        this.childSex = childSex;
    }
    public int getChildAge() {
        return childAge;
    }
    public void setChildAge(int childAge) {
        this.childAge = childAge;
    }
    public Date getPredictedBirthDate() {
        return predictedBirthDate;
    }
    public void setPredictedBirthDate(Date predictedBirthDate) {
        this.predictedBirthDate = predictedBirthDate;
    }
    public Set<Category> getCategory() {
        return category;
    }
    public Set<Subcategory> getSubcategory() {
        return subcategory;
    }

    public void setCategory(Set<Category> category) {
        this.category = category;
    }

    public void setSubcategory(Set<Subcategory> subcategory) {
        this.subcategory = subcategory;
    }
}
