package com.example.demo.DTO;

import com.example.demo.Entity.Lending;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

public class CustomerDTO {
    String customerId;
    String fName;
    String lName;
    String phone;
    List<String> lendings;

    public CustomerDTO(String customerId, String fName, String lName, String phone, List<String> lendings) {
        this.customerId = customerId;
        this.fName = fName;
        this.lName = lName;
        this.phone = phone;
        this.lendings = lendings;
    }

    public String getCustomerId() {
        return customerId;
    }

    public String getfName() {
        return fName;
    }

    public String getPhone() {
        return phone;
    }

    public List<String> getLendings() {
        return lendings;
    }

    public String getlName() {
        return lName;
    }
}
