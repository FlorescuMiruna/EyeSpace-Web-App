package com.example.eyespace.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String text;
    //private String photo;

    @ElementCollection
    private Set<Long> likes = new HashSet<>();
//    private int likes=0;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    //@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movie;

    //@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;






    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", likes=" + likes +
                ", date=" + date +
                ", movie=" + movie.getId() +
                ", user=" + user.getUsername() +

                '}';
    }
}
