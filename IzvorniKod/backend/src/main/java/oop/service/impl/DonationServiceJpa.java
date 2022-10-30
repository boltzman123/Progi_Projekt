package oop.service.impl;

import oop.dao.DonationRepository;
import oop.domain.Donation;
import oop.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationServiceJpa implements DonationService {
    @Autowired
    private DonationRepository repository;
    @Override
    public List<Donation> listAll() {
        return repository.findAll();
    }

    @Override
    public Donation createDonation(Donation donation) {
        return repository.save(donation);
    }

    @Override
    public Donation updateDonation(Donation donation) {
        return repository.save(donation);
    }
}
