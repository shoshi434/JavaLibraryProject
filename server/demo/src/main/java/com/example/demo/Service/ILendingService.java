package com.example.demo.Service;

import com.example.demo.DTO.LendingDTO;
import com.example.demo.Entity.Lending;

import java.util.ArrayList;
import java.util.List;

public interface ILendingService {
    List<LendingDTO> getAllLendingsById(String id);
    boolean returnBook(int id);
    boolean addLending(LendingDTO l);
    List<LendingDTO> getAllLendings();
    double pay(String id);
}
