package oop.service;

import oop.domain.Donation;
import oop.domain.Item;

import java.util.List;

public interface DonationService {
    List<Donation> listAll();
    Donation createDonation(Donation donation);
    Donation updateDonation(Donation donation);
}
