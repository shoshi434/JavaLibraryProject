package com.example.demo.Service;

import com.example.demo.DTO.LendingDTO;
import com.example.demo.Entity.Book;
import com.example.demo.Entity.Customer;
import com.example.demo.Entity.Lending;
import com.example.demo.Repository.RepositoryBook;
import com.example.demo.Repository.RepositoryCustomer;
import com.example.demo.Repository.RepositoryLending;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class LendingService implements ILendingService{
 RepositoryLending rep;
 RepositoryBook repB;
 RepositoryCustomer repC;
    @Autowired
    LendingService(RepositoryLending rep,RepositoryBook repB, RepositoryCustomer repC){
        this.rep=rep;
        this.repB=repB;
        this.repC=repC;
    }
  public boolean addLending(LendingDTO l){
       try {
           Lending l1=toLending(l);
           
           // בדיקה שהלקוח והספר קיימים
           if (l1.getCustomer() == null) {
               System.err.println("לקוח לא נמצא עם ID: " + l.getCustomerId());
               return false;
           }
           if (l1.getBook() == null) {
               System.err.println("ספר לא נמצא עם ID: " + l.getBookId());
               return false;
           }
           
           // אל תגדיר ID ידנית - תן ל-database לייצר אותו אוטומטית
           rep.save(l1);
           System.out.println("השאלה נשמרה בהצלחה עם ID: " + l1.getLendingId());
           return true;
       } catch (Exception e) {
           System.err.println("שגיאה בשמירת ההשאלה: " + e.getMessage());
           e.printStackTrace();
           return false;
       }
  }
  public boolean returnBook(int id){
       Lending l= rep.findById(id).orElse(null);
       if(l==null)
           return false;
       l.setReturned(true);
       rep.save(l);
       return true;
  }
  public List<LendingDTO> getAllLendingsById(String id){
        ArrayList<Lending> lendings=(ArrayList<Lending>) rep.findAll();
      Stream<Lending> x= lendings.stream()
              .filter(lending -> lending.getCustomer() != null)
              .filter(lending -> id.equals(lending.getCustomer().getCustomerId()));
              List<Lending> l=( ArrayList<Lending>) x.collect(Collectors.toList());
              return toDTOList(l);
  }

  public List<LendingDTO> getAllLendings(){
      List<Lending> l= (List<Lending>) rep.findAll();
      return toDTOList(l);
  }

  public double pay(String id){
      List<LendingDTO> myLendings= getAllLendingsById( id);

     double s= myLendings.stream().reduce(0.0,(sum,l)->{
         long days= ChronoUnit.DAYS.between(l.getLendingDate(), LocalDate.now());
         return sum + (days > 14 ? (days - 14) * 0.5 : 0);
      }, (sum1, sum2) -> sum1 + sum2);
     return s;
  }

  //פונקציות המרה
  public LendingDTO toDto(Lending l) {
      if (l == null || l.getCustomer() == null || l.getBook() == null) {
          return null;
      }

      return new LendingDTO(
              l.getLendingId(),
              l.getCustomer().getfName(),
              l.getCustomer().getCustomerId(),
              l.getBook().getBookId(),
              l.getLendingDate(),
              l.getReturned()
      );
  }

    public Lending toLending(LendingDTO l){
        Book b=repB.findById(l.getBookId()).orElse(null);
        Customer c=repC.findById(l.getCustomerId()).orElse(null);
        return new Lending(c,b,l.getLendingDate(),false); // false = לא הוחזר עדיין
    }
    public List<LendingDTO> toDTOList(List<Lending> l){
        return l.stream().map(l2->toDto(l2)).toList();
    }
    public List<Lending> toLending(List<LendingDTO> l){
        return l.stream().map(lendingDTO -> toLending(lendingDTO)).toList();
    }


}
