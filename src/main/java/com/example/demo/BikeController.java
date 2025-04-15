package com.example.demo;

import com.example.demo.Bike;
import com.example.demo.BikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bikes")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access
public class BikeController {

    @Autowired
    private BikeRepository bikeRepository;

    // Get all bikes
    @GetMapping
    public List<Bike> getAllBikes() {
        return bikeRepository.findAll();
    }

    // Get bike by ID
    @GetMapping("/{id}")
    public ResponseEntity<Bike> getBikeById(@PathVariable Long id) {
        return bikeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create new bike
    @PostMapping
    public Bike createBike(@RequestBody Bike bike) {
        return bikeRepository.save(bike);
    }

    // Update bike
    @PutMapping("/{id}")
    public ResponseEntity<Bike> updateBike(@PathVariable Long id, @RequestBody Bike bikeDetails) {
        return bikeRepository.findById(id)
                .map(bike -> {
                    bike.setBrand(bikeDetails.getBrand());
                    bike.setName(bikeDetails.getName());
                    bike.setType(bikeDetails.getType());
                    bike.setTopSpeed(bikeDetails.getTopSpeed());
                    bike.setHorsepower(bikeDetails.getHorsepower());
                    bike.setDescription(bikeDetails.getDescription());
                    bike.setImage(bikeDetails.getImage());
                    Bike updatedBike = bikeRepository.save(bike);
                    return ResponseEntity.ok(updatedBike);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete bike
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBike(@PathVariable Long id) {
        return bikeRepository.findById(id)
                .map(bike -> {
                    bikeRepository.delete(bike);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Search bikes
    @GetMapping("/search")
    public List<Bike> searchBikes(@RequestParam(required = false) String query) {
        if (query == null || query.isEmpty()) {
            return bikeRepository.findAll();
        }
        return bikeRepository.findByNameContainingIgnoreCaseOrBrandContainingIgnoreCaseOrTypeContainingIgnoreCase(
                query, query, query);
    }

    // Filter by top speed range
    @GetMapping("/filter/speed")
    public List<Bike> filterBySpeedRange(
            @RequestParam(required = false) Integer min,
            @RequestParam(required = false) Integer max) {

        if (min != null && max != null) {
            return bikeRepository.findByTopSpeedBetween(min, max);
        } else if (min != null) {
            return bikeRepository.findByTopSpeedGreaterThanEqual(min);
        } else {
            return bikeRepository.findAll();
        }
    }

}