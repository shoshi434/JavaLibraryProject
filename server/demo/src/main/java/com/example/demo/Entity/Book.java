package com.example.demo.Entity;

import jakarta.persistence.*;
import org.hibernate.Length;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table
public class Book {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    int bookId;

    @Column(length =9)
    String author;

    String bookName;

    LocalDate releaseDate;

    @OneToMany(mappedBy = "book")
    List<Lending> lendings;
    public Book(String author, String bookName, LocalDate releaseDate, List<Lending> lendings) {
        this.author = author;
        this.bookName = bookName;
        this.releaseDate = releaseDate;
        this.lendings = lendings;
    }

    public Book() {
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

    public List<Lending> getLendings() {
        return lendings;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }
}
