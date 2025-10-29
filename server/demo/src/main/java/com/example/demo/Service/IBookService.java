package com.example.demo.Service;

import com.example.demo.DTO.BookDTO;
import com.example.demo.Entity.Book;

import java.util.List;

public interface IBookService {
    BookDTO getById(int id);
    List<BookDTO> getAll();
    Boolean updateBook(int id, BookDTO b);
    boolean addBook (BookDTO b);
    List<BookDTO> getByPublishDate (int year);
    BookDTO getByName (String name);

}
