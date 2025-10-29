package com.example.demo.Service;

import com.example.demo.DTO.CustomerDTO;
import com.example.demo.Entity.Customer;

import java.util.List;

public interface ICustomerService {
    List<CustomerDTO> getAllCustomers();
    boolean addCustomer (CustomerDTO c);
    CustomerDTO getById(String id);
}
