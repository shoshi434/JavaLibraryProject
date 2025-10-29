package com.example.demo.Repository;

import com.example.demo.Entity.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryCustomer extends CrudRepository<Customer, String> {
}
