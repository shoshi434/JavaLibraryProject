package com.example.demo.DTO;

import com.example.demo.Entity.Lending;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

public class BookDTO
{
    int bookId;
    String author;
    String bookName;
    LocalDate releaseDate;

    public BookDTO(int bookId, String author, String bookName, LocalDate releaseDate) {
        this.bookId = bookId;
        this.author = author;
        this.bookName = bookName;
        this.releaseDate = releaseDate;
    }

    public int getBookId() {
        return bookId;
    }

    public String getAuthor() {
        return author;
    }

    public String getBookName() {
        return bookName;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }



}

