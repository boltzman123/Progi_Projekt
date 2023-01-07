package oop.service.impl;

import oop.dao.DonationRepository;
import oop.domain.Donation;
import oop.domain.Users;
import oop.service.DonationService;
import oop.service.EntityMissingException;
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

    @Override
    public List<Donation> listByUser(String email) {
        return repository.findByUser(email);
    }


    // Obrisi donaciju
    @Override
    public Donation deleteDonation(Long id) {
        Donation donation = repository.findById(id).get();
        repository.delete(donation);
        return donation;
    }

    @Override
    public Donation getDonationById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityMissingException(Donation.class, id)
        );
    }

    @Override
    public Donation delete(Donation donation) {
        repository.delete(donation);
        return donation;
    }
}
