package com.example.demo.Service;

import com.example.demo.DTO.BookDTO;
import com.example.demo.Entity.Book;
import com.example.demo.Repository.RepositoryBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class BookService implements IBookService
{
    RepositoryBook rep;

    @Autowired
    BookService(RepositoryBook rep){
        this.rep=rep;
    }

    public BookDTO getById(int id){

        Book b= rep.findById(id).orElse(null);
        return toDTO(b);
    }

    public List<BookDTO> getAll(){
        List<Book> b= (List<Book>) rep.findAll();
        return toDtoList(b);
    }

    public Boolean updateBook(int id, BookDTO b) {

        if (rep.existsById(id)) {
            Book b1=toBook(b);
            b1.setBookId(id);
            rep.save(b1);
            return true;
        }
        else return false;
    }
    public boolean addBook (BookDTO b){
        Book b1=toBook(b);
        rep.save(b1);

            return true;

    }
    public BookDTO getByName (String name){
        ArrayList<Book> books =(ArrayList<Book>) rep.findAll();
        Book b1= books.stream().filter(b -> b.getBookName().equals(name)).findFirst().orElse(null);
        return toDTO(b1);
    }
    public List<BookDTO> getByPublishDate (int year){
        List<Book> books =(List<Book>) rep.findAll();
        List<Book> b1= (List<Book> ) books.stream().filter(b -> b.getReleaseDate() != null && b.getReleaseDate().getYear() == year).toList();
        return toDtoList(b1);
    }

    //פונקציות המרה
    public BookDTO toDTO(Book b){
       return new BookDTO(b.getBookId(),b.getAuthor(),b.getBookName(),b.getReleaseDate());
    }

    public Book toBook(BookDTO b){
        return new Book(b.getAuthor(),b.getBookName(),b.getReleaseDate(),null);
    }
    public List<BookDTO> toDtoList(List<Book> b){
      List<BookDTO> newB= b.stream().map(book -> toDTO(book)).toList();
      return newB;
    }
    public List<Book> toBookList(List<BookDTO> b){
       return b.stream().map(bookDTO -> toBook(bookDTO)).toList();
    }


}
