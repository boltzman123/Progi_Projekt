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
    @ManyToMany(mappedBy = "donatedToUser")
    private Set<Donation> donations;

    public Set<Donation> getDonations() {
        return donations;
    }
    /*private boolean accountVerified;
    private String token;
    @OneToMany(mappedBy = "user")
    private Set<SecureToken> tokens;*/

    /*public boolean isAccountVerified() {
        return accountVerified;
    }

    public void setAccountVerified(boolean accountVerified) {
        this.accountVerified = accountVerified;
    }*/

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
