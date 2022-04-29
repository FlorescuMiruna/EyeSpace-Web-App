package com.example.eyespace.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

@Table(name = "movie")


public class Movie {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @NotNull
//    private int id;
    @Id
    private String id;

    //@Column(name = "title")
//    @JsonProperty("title")
    private String title;
    private String director;
    private String genre;
    private String date;

    @Lob
    @Column( name = "plot")
    private String plot;
    private String rating;
    private String posterUrl;



  //  @JsonIgnore
//    @ManyToMany(mappedBy = "movies")
//    private Set<User> users = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "movie_user",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private  Set<User> users = new HashSet<>();


    @Override
    public String toString() {
        return "Movie{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", director='" + director + '\'' +
                ", genre='" + genre + '\'' +
                ", date='" + date + '\'' +
                ", plot='" + plot + '\'' +
                ", rating='" + rating + '\'' +
                ", posterUrl='" + posterUrl + '\'' +

                '}';
    }
}