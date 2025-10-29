package com.example.demo.Controller;

import com.example.demo.DTO.BookDTO;
import com.example.demo.Entity.Book;
import com.example.demo.Service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/book")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    IBookService bookService;
     @Autowired
    public BookController(IBookService bookService) {
         this.bookService=bookService;
    }
    @GetMapping("/getAll")
    public List<BookDTO> getAll(){
         return bookService.getAll();
    }
    @PostMapping("/add")
    public boolean addBook(@RequestBody BookDTO b){
         return bookService.addBook(b);
    }
    @GetMapping("/getByIb/{id}")
    public BookDTO getById(@PathVariable int id){
         return bookService.getById(id);
    }
    @PutMapping("/update/{id}")
    public boolean updateBook(@RequestBody BookDTO b,@PathVariable int id){
         return bookService.updateBook(id,b);
    }
    @GetMapping("/getByPublishDate/{year}")
    public List<BookDTO> getByPublishDate(@PathVariable int  year){
         return bookService.getByPublishDate(year);
    }
    @GetMapping("/getByName/{name}")
    public BookDTO getByName(@PathVariable String name){
         return bookService.getByName(name);
    }
}
