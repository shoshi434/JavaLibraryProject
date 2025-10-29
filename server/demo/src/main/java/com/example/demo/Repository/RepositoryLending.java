package com.example.demo.Repository;

import com.example.demo.Entity.Lending;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryLending extends CrudRepository<Lending,Integer> {
}
