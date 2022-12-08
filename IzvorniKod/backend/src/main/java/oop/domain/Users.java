package oop.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "users")
public class Users {
    @Id
    private String email;
    @NotNull
    private String userName;
    @NotNull
    private String userSurname;
    @NotNull
    private String password;
    private String userLocation;
    private boolean canDonate;
    @JsonIgnore
    @OneToMany(mappedBy = "donatedToUser")
    private Set<Donation> donations;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Donation> donation;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Child> children;

    public Set<Donation> getDonations() {
        return donations;
    }


    public void setDonations(Set<Donation> donations) {
        this.donations = donations;
    }


    public void setCanDonate(boolean canDonate) {
        this.canDonate = canDonate;
    }

    public boolean isCanDonate() {
        return canDonate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserSurname() {
        return userSurname;
    }

    public void setUserSurname(String userSurname) {
        this.userSurname = userSurname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserLocation() {
        return userLocation;
    }

    public void setUserLocation(String userLocation) {
        this.userLocation = userLocation;
    }

    public String generateRegistrationMessage(){
        String hello = "Dear "+this.getUserName()+",\n";
        String hello2 = "Thank you for registering for our donation app Djeca Za Djecu\nYour registration is now confirmed\n";
        String hello3 = "Here is the link to our application:\n";
        String link = "https://djeca-za-djecu-frontend-service.onrender.com";
        String hello4 ="\nEnjoy donating!";
        String message = hello+hello2+hello3+link+hello4;
        return message;
    }
}
