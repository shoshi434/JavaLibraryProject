package com.example.demo.Controller;

import com.example.demo.DTO.CustomerDTO;
import com.example.demo.Entity.Customer;
import com.example.demo.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    CustomerService customerService;
    @Autowired
    public CustomerController(CustomerService customerService){
        this.customerService=customerService;
    }

   @GetMapping("/getAll")
    public List<CustomerDTO> getAll(){
       return customerService.getAllCustomers();
   }
   @GetMapping("/getById/{id}")
    public CustomerDTO getById(@PathVariable String id){
       return customerService.getById(id);
   }
   @PostMapping("/add")
    public boolean addCustomer(@RequestBody CustomerDTO c){
       return customerService.addCustomer(c);
   }

}
