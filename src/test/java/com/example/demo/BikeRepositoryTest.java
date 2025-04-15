package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class BikeRepositoryTest {

    @Autowired
    private BikeRepository bikeRepository;

    @Test
    public void whenFindById_thenReturnBike() {
        // Given
        Bike bike = new Bike("Ducati", "Panigale V4", "Sportbike", 299, 214, "Desc", "image.jpg");
        bikeRepository.save(bike);

        // When
        Bike found = bikeRepository.findById(bike.getId()).orElse(null);

        // Then
        assertNotNull(found);
        assertEquals("Ducati", found.getBrand());
    }
}
