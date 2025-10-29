package com.example.demo.Controller;


import com.example.demo.DTO.LendingDTO;
import com.example.demo.Entity.Lending;
import com.example.demo.Service.IBookService;
import com.example.demo.Service.ILendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/lending")
@CrossOrigin(origins = "http://localhost:3000")
public class LendingController {
    ILendingService lendingService;
    @Autowired
    public LendingController(ILendingService lendingService) {
        this.lendingService=lendingService;
    }
    @GetMapping("/getAllById/{id}")
    public List<LendingDTO> getAll(@PathVariable String id){
        return lendingService.getAllLendingsById(id);
    }
    @PostMapping("/add")
    public boolean addLending(@RequestBody LendingDTO l){
        return lendingService.addLending(l);
    }
@GetMapping("/getAll")
    public List<LendingDTO> getAllLendings(){
        return lendingService.getAllLendings();
}
    @GetMapping("/pay/{id}")
    public double pay (@PathVariable String id){
       return lendingService.pay(id);
    }
    @PutMapping("/returnBook/{id}")
    public boolean returnBook(@PathVariable int id){
       return lendingService.returnBook(id);

    }


}

