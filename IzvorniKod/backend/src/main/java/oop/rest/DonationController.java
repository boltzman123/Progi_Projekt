package oop.rest;

import oop.domain.*;
import oop.service.ChildService;
import oop.service.DonationService;
import oop.service.ItemService;
import oop.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/donation")
@PropertySource(value = "classpath:application.properties")
public class DonationController {
    @Autowired
    private DonationService service;

    @Autowired
    private ItemService itemService;
    @Autowired
    private ChildService childService;

    @Autowired
    private UploadService uploadService;

    // Izlistaj sve donacije
    @GetMapping("")
    @Secured("ROLE_ADMIN")
    public List<Donation> listDonation(){
        return service.listAll();
    }

    // Izlistaj sve donacije pojedinog usera
    @GetMapping("/users/{email}")
    public List<Donation> listDonationsByUser(@PathVariable String email){
        return service.listByUser(email);
    }

    // Vrati donaciju po id-u
    @GetMapping("/{id}")
    public Donation listDonationById(@PathVariable Long id){
        return service.getDonationById(id);
    }

    // Vratiti sve donacije poslane na doradu pojedinom korisniku
    @GetMapping("/edit/{email}")
    public List<Donation> getEditableDonations(@PathVariable String email){
        return service.listByUser(email).stream().filter(d -> d.isEdit()==true).collect(Collectors.toList());
    }

    // Filter donacija

    // Aktivni oglasi -> validni i aktivni
    @GetMapping("/active")
    @Secured("ROLE_ADMIN")
    public List<Donation> listActive(){
        return service.listAll().stream().filter(l -> l.isActive() == true && l.isValid() == true).collect(Collectors.toList());
    }
    // Neobjavljeni oglasi -> valid=false
    @GetMapping("/notvalid")
    @Secured("ROLE_ADMIN")
    public List<Donation> listNotValid(){
        return service.listAll().stream().filter(l -> l.isActive() == true && l.isValid() == false && l.isEdit() == false).collect(Collectors.toList());
    }
    // Preporučene i aktivne donacije za usera
    @GetMapping("/user/{email}")
    public Map<String,List<Donation>> donationByChild(@PathVariable("email") String email){
        List<Child> childList = childService.listChildByUser(email);
        Set<String> subcategoryNames = new HashSet<>();
        Set<Integer> childAges = new HashSet<>();
        Set<Character> childSex = new HashSet<>();
        for(Child c: childList){
            Set<Subcategory> subcategories = c.getSubcategory();
            subcategories.stream().forEach(s -> {
                subcategoryNames.add(s.getSubcategoryName());
            });
            childAges.add(c.getChildAge());
            childSex.add(c.getChildSex());
        }
        // Filter aktivnih i (preporučenih koji nisu stariji od 3 dana)
        List<Donation> donationsFiltered = new ArrayList<>();
        List<Donation> donationsFilteredActive = new ArrayList<>();
        List<Donation> allActiveDonations = service.listAll().stream().filter(l -> l.isActive() == true && l.isValid() == true ).collect(Collectors.toList());
        List<Donation> allDonations = service.listAll();
        LocalDate before3Days = LocalDate.now().minusDays(3);
        Instant compareDate = before3Days.atStartOfDay(ZoneId.systemDefault()).toInstant();

        for(Donation d: allActiveDonations){
            if(subcategoryNames.contains(d.getItem().getSubcategory().getSubcategoryName()) &&
                    d.getDateOfPublication().toInstant().compareTo(compareDate)>=0 &&
                    childAges.contains(d.getItem().getForAge()) &&
                    childSex.contains(d.getItem().getForSex())){
                if(!d.getUser().getEmail().equals(email)){
                    donationsFiltered.add(d);
                }
            } else {
                donationsFilteredActive.add(d);

            }
        }


        List<Donation> donatedToMe = service.listAll().stream().filter(d -> {
            if(d.getDonatedToUser()!=null && d.getDonatedToUser().getEmail().equals(email)){
                Date dateClosedDonation = d.getDateOfClosing();
                Float expired =d.getItem().getSubcategory().getUseDateExpires();
                LocalDate date = LocalDate.now().minusMonths((int)(expired * 12));
                Instant compareDate2 = date.atStartOfDay(ZoneId.systemDefault()).toInstant();

                if(dateClosedDonation.toInstant().compareTo(compareDate2)<0) {
                    return true;
                }
            }
            return false;
        }).collect(Collectors.toList());

        // Seasons filter
        List<Donation> seasonDonations = service.listAll().stream().filter(d -> {
            if(d.getDonatedToUser() != null && d.getDonatedToUser().getEmail().equals(email)){
                int month = LocalDate.now().getMonthValue();
                Season season = d.getItem().getSubcategory().getSeason();
                if(season.equals(Season.ALL)) return true;
                else if(season.equals(Season.WINTER) && ((month > 0 && month <3) || month == 12)) return true;
                else if(season.equals(Season.SPRING) && (month >= 3 && month < 6)) return true;
                else if (season.equals(Season.SUMMER) && (month >= 6 && month < 9)) return true;
                else if (season.equals(Season.AUTUMN) && (month >= 9 && month < 12)) return true;
                else return false;

            }
            return false;

        }).collect(Collectors.toList());
        
        Map<String,List<Donation>> returnMap = new HashMap<>();

        if(!(email == "admin")){
            returnMap.put("preporucen",donationsFiltered);
            returnMap.put("aktivan", donationsFilteredActive);
            returnMap.put("primljen",donatedToMe);
            returnMap.put("sezona", seasonDonations);
        }
        else{
            returnMap.put("preporucen",donationsFiltered);
            returnMap.put("aktivan", allActiveDonations);
            returnMap.put("primljen",donatedToMe);
            returnMap.put("sezona", seasonDonations);
        }
        return returnMap;
    }


    // Filtrirane donacije po kategorijama i podkategorijama (Potrebno napraviti)


    // Kreiraj donaciju

    // Donacija s itemom
    @PostMapping("")
    public ResponseEntity<Donation> createDonationWithItem(@RequestBody Donation donation) throws Exception{

        if(donation.getDateOfClosing()==null){
            donation.setActive(true);
        }

        donation.setItem(itemService.createItem(donation.getItem()));
        donation.setDateOfPublication(new Date());
        Donation saved = service.createDonation(donation);
        return ResponseEntity.created(URI.create("/donation/" + saved.getIdDonation())).body(saved);
    }

    // Donacija s već kreiranim itemom
    @PostMapping("/createDonation")
    public ResponseEntity<Donation> createDonation(@RequestBody Donation donation){
        if(donation.getDateOfClosing()==null){
            donation.setActive(true);
        }
        donation.setDateOfPublication(new Date());
        Donation saved = service.createDonation(donation);
        return ResponseEntity.created(URI.create("/donation/" + saved.getIdDonation())).body(saved);
    }

    // Update donaciju
    @PutMapping("/{id}")
    public Donation updateDonation(@PathVariable("id") Long id, @RequestBody Donation donation){
        if(!donation.getIdDonation().equals(id)){
            throw new IllegalArgumentException("Donation id must be preserved");
        }
        if(donation.getDateOfClosing() != null){
            donation.setActive(false);
        } else {
            donation.setActive(true);
        }
        itemService.updateItem(donation.getItem());
        return service.updateDonation(donation);
    }

    // Brisanje donacije na 2 načina
    @DeleteMapping("/{id}")
    public Donation deleteDonation(@PathVariable("id") Long id){
        return service.deleteDonation(id);
    }

    @DeleteMapping
    public Donation delete(@RequestBody Donation donation){
        return service.delete(donation);
    }
}
