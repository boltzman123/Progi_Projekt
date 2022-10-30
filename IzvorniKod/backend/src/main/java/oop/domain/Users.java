package oop.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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
    private boolean isAccountVerified = false;
    private boolean canDonate = false;

    public boolean isIsAccountVerified() {
        return isAccountVerified;
    }

    public void setIsAccountVerified(boolean isAccountVerified) {
        this.isAccountVerified = isAccountVerified;
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
}
