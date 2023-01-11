package oop.rest;

import oop.domain.Season;
import oop.domain.Subcategory;
import oop.service.SubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/subcategory")
@PropertySource(value = "classpath:application.properties")
public class SubcategoryController {
    @Autowired
    private SubcategoryService service;

    // Izlistaj sve podkategorije
    @GetMapping("")
    public List<Subcategory> listSubcategory(){
        return service.listAll();
    }

    // Izlistaj podkategoriju po imenu
    @GetMapping("/{subcategoryName}")
    public Subcategory getSubcategoryByName(@PathVariable("subcategoryName") String subcategoryName){
        return service.getSubcategoryByName(subcategoryName).get();
    }
    @GetMapping("/seasons")
    public List<Season> getAllSeasons(){
        List<Season> seasons = new ArrayList<>();
        seasons.add(Season.AUTUMN);
        seasons.add(Season.SPRING);
        seasons.add(Season.SUMMER);
        seasons.add(Season.WINTER);
        return seasons;
    }

    // Izlistaj podkategorije po imenu kategorije
    @GetMapping("/category/{categoryName}")
    public List<Subcategory> getSubcategoryByCategory(@PathVariable("categoryName") String categoryName){
        List<Subcategory> subcategoryList = service.listAll().stream().filter(s -> s.getCategory().getCategoryName().equals(categoryName)).collect(Collectors.toList());
        return subcategoryList;
    }

    // Dodaj podkategoriju
    @PostMapping("")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Subcategory> createSubcategory(@RequestBody Subcategory subcategory){
        Subcategory saved = service.createSubcategory(subcategory);
        return ResponseEntity.created(URI.create("/subcategory/" + saved.getSubcategoryName().equalsIgnoreCase(" "))).body(saved);
    }

    // Update podkategoriju
    @PutMapping("/{subcategoryName}")
    @Secured("ROLE_ADMIN")
    public Subcategory updateSubcategory(@PathVariable("subcategoryName") String subcategoryName, @RequestBody Subcategory subcategory){
        if(!subcategory.getSubcategoryName().equals(subcategoryName)){
            throw new IllegalArgumentException("Subcategory name must be preserved");
        }
        return service.updateSubcategory(subcategory);

    }

    // Obriši podkategoriju pomoću id-a ili objekta
    @DeleteMapping("/{name}")
    @Secured("ROLE_ADMIN")
    public Subcategory deleteSubcategoryByName(@PathVariable("name") String name) {
        return service.deleteSubcategory(name);
    }

    @DeleteMapping()
    @Secured("ROLE_ADMIN")
    public Subcategory deleteSubcategory(@RequestBody Subcategory subcategory){
        return service.delete(subcategory);
    }

}
