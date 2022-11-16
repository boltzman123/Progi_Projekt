package oop.rest;

import oop.domain.Donation;
import oop.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/donation")
@PropertySource(value = "classpath:application.properties")
public class DonationController {
    @Autowired
    private DonationService service;

    @GetMapping("")
    public List<Donation> listDonation(){
        return service.listAll();
    }
    @PostMapping("")
    public ResponseEntity<Donation> createDonation(@RequestBody Donation donation){
        Donation saved = service.createDonation(donation);
        return ResponseEntity.created(URI.create("/donation/" + saved.getIdDonation())).body(saved);
    }
    @PutMapping("/{id}")
    public Donation updateDonation(@PathVariable("id") Long id, @RequestBody Donation donation){
        if(!donation.getIdDonation().equals(id)){
            throw new IllegalArgumentException("Donation id must be preserved");
        }
        return service.updateDonation(donation);
    }
}
