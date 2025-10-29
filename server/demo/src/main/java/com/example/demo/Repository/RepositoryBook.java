package com.example.demo.Repository;

import com.example.demo.Entity.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryBook extends CrudRepository<Book,Integer> {
}
