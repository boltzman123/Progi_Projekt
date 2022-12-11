package oop.service;

import oop.domain.Donation;
import oop.domain.Item;
import oop.domain.Users;

import java.util.List;

public interface DonationService {
    List<Donation> listAll();
    Donation getDonationById(Long id);
    Donation createDonation(Donation donation);
    Donation updateDonation(Donation donation);
    List<Donation> listByUser(String email);
    Donation deleteDonation(Long id);
    Donation delete(Donation donation);
}
