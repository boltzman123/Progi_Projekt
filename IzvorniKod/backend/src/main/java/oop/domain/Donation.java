package oop.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Donation {
    @Id
    @GeneratedValue
    private Long idDonation;
    private String donationName;
    private Date dateOfPublication;
    private Date dateOfClosing;
    private boolean isValid;
    private boolean isActive;
    private String pictureURL;
    private String handoverLocation;
    @ManyToOne
    @JoinColumn(name = "user_email")
    private Users user;
    @OneToOne
    @JoinColumn(name = "item_id")
    private Item item;
    @ManyToMany
    @JoinTable(name = "DONATED_TO_USER",
            joinColumns = {

                    @JoinColumn(name = "donation_id", referencedColumnName = "idDonation")
            },
            inverseJoinColumns = @JoinColumn(name = "user_email", referencedColumnName = "email")
    )
    private Set<Users> donatedToUser = new HashSet<>();

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Long getIdDonation() {
        return idDonation;
    }

    public String getDonationName() {
        return donationName;
    }

    public void setDonationName(String donationName) {
        this.donationName = donationName;
    }

    public Date getDateOfPublication() {
        return dateOfPublication;
    }

    public void setDateOfPublication(Date dateOfPublication) {
        this.dateOfPublication = dateOfPublication;
    }

    public Date getDateOfClosing() {
        return dateOfClosing;
    }

    public void setDateOfClosing(Date dateOfClosing) {
        this.dateOfClosing = dateOfClosing;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getPictureURL() {
        return pictureURL;
    }

    public void setPictureURL(String pictureURL) {
        this.pictureURL = pictureURL;
    }

    public String getHandoverLocation() {
        return handoverLocation;
    }

    public void setHandoverLocation(String handoverLocation) {
        this.handoverLocation = handoverLocation;
    }
}
