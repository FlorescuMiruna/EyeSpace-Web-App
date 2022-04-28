package com.example.eyespace.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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



}