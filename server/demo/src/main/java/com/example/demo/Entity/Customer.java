package com.example.demo.Entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class Customer {

    @Id
    @Column(length =9)
    String customerId;

    String fName;
    String lName;
    String phone;
    @OneToMany(mappedBy = "customer")
        List<Lending> lendings;

    public Customer() {
    }

    public Customer(String customerId, List<Lending> lendings, String phone, String lName, String fName) {
        this.customerId = customerId;
        this.lendings = lendings;
        this.phone = phone;
        this.lName = lName;
        this.fName = fName;
    }

    public String getCustomerId() {
        return customerId;
    }

    public List<Lending> getLendings() {
        return lendings;
    }

    public String getPhone() {
        return phone;
    }

    public String getlName() {
        return lName;
    }

    public String getfName() {
        return fName;
    }
}
