package com.example.demo.Service;

import com.example.demo.DTO.CustomerDTO;
import com.example.demo.Entity.Customer;
import com.example.demo.Repository.RepositoryCustomer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerService implements ICustomerService {
    RepositoryCustomer rep;
    @Autowired
    CustomerService(RepositoryCustomer rep){
        this.rep=rep;
    }
    public CustomerDTO getById(String id){

        Customer c= rep.findById(id).orElse(null);
        return toDTO(c);
    }
    public boolean addCustomer (CustomerDTO c){
        List<Customer> customers = (List<Customer>)rep.findAll();
        for (Customer customer :customers){
            if(customer.getCustomerId().equals(c.getCustomerId()))
                return false;
        }

        rep.save(toCustomer(c));
        return true;

    }
    public List<CustomerDTO> getAllCustomers(){
        List<Customer> c=(List<Customer>) rep.findAll();
        return toListDTO(c);
    }

    public CustomerDTO toDTO(Customer c){
        List<String> s=c.getLendings().stream().map(n->n.getBook().getBookName()).toList();
        return new CustomerDTO(c.getCustomerId(),c.getfName(),c.getlName(),c.getPhone(),s);
    }
    public Customer toCustomer(CustomerDTO c){
        return new Customer(c.getCustomerId(),null,c.getPhone(),c.getlName(),c.getfName());
    }
    public List<CustomerDTO> toListDTO(List<Customer> c){
        return c.stream().map(co->toDTO(co)).toList();
    }
    public List<Customer> toListCustomer(List<CustomerDTO> c){
        return c.stream().map(co->toCustomer(co)).toList();
    }
}
