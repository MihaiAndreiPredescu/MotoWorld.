package com.example.demo;

import com.example.demo.Bike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BikeRepository extends JpaRepository<Bike, Long> {

    // Find bikes by brand (case-insensitive, containing)
    List<Bike> findByBrandContainingIgnoreCase(String brand);

    // Find bikes by type (case-insensitive, containing)
    List<Bike> findByTypeContainingIgnoreCase(String type);

    // Find bikes by name (case-insensitive, containing)
    List<Bike> findByNameContainingIgnoreCase(String name);

    // Custom query for search functionality
    List<Bike> findByNameContainingIgnoreCaseOrBrandContainingIgnoreCaseOrTypeContainingIgnoreCase(
            String name, String brand, String type);

    // Find bikes with top speed greater than or equal to value
    List<Bike> findByTopSpeedGreaterThanEqual(int speed);

    // Find bikes with top speed between min and max
    List<Bike> findByTopSpeedBetween(int minSpeed, int maxSpeed);
}