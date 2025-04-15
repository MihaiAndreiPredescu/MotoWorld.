package com.example.demo;

import jakarta.persistence.*;

@Entity
@Table(name = "bikes")
public class Bike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(name = "top_speed", nullable = false)
    private int topSpeed;

    @Column(nullable = false)
    private int horsepower;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String image;

    // Constructors
    public Bike() {
    }

    public Bike(String brand, String name, String type, int topSpeed, int horsepower, String description, String image) {
        this.brand = brand;
        this.name = name;
        this.type = type;
        this.topSpeed = topSpeed;
        this.horsepower = horsepower;
        this.description = description;
        this.image = image;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getTopSpeed() {
        return topSpeed;
    }

    public void setTopSpeed(int topSpeed) {
        this.topSpeed = topSpeed;
    }

    public int getHorsepower() {
        return horsepower;
    }

    public void setHorsepower(int horsepower) {
        this.horsepower = horsepower;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Bike{" +
                "id=" + id +
                ", brand='" + brand + '\'' +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", topSpeed=" + topSpeed +
                ", horsepower=" + horsepower +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}