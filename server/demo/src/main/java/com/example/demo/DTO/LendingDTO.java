package com.example.demo.DTO;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.Customer;
import jakarta.persistence.*;

import java.time.LocalDate;

public class LendingDTO {
    int LendingId;
    String customerName;
    String customerId;
    int bookId;
    LocalDate lendingDate;
    Boolean returned;

    // Constructor ברירת מחדל עבור Jackson deserialization
    public LendingDTO() {
    }

    public LendingDTO(int lendingId, String customerName, String customerId, int bookId, LocalDate lendingDate, Boolean returned) {
        LendingId = lendingId;
        this.customerName = customerName;
        this.customerId = customerId;
        this.bookId = bookId;
        this.lendingDate = lendingDate;
        this.returned = returned;
    }

    public int getLendingId() {
        return LendingId;
    }

    public void setLendingId(int lendingId) {
        LendingId = lendingId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public LocalDate getLendingDate() {
        return lendingDate;
    }

    public void setLendingDate(LocalDate lendingDate) {
        this.lendingDate = lendingDate;
    }

    public void setReturned(Boolean returned) {
        this.returned = returned;
    }

    public Boolean getReturned() {
        return returned;
    }
}
