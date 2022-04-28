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

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NotNull
    private int id;

    private String idIMDB;

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

    // private String actors;

    @JsonIgnore
    @ManyToMany(mappedBy = "movies")
    private List<User> users = new ArrayList<>();

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", idIMDB='" + idIMDB + '\'' +
                ", title='" + title + '\'' +
                ", director='" + director + '\'' +
                ", genre='" + genre + '\'' +
                ", date='" + date + '\'' +
                ", plot='" + plot + '\'' +
                ", rating='" + rating + '\'' +
                ", posterUrl='" + posterUrl + '\'' +
                ", users=" + users +
                '}';
    }
}