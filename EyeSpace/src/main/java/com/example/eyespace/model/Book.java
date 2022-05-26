package com.example.eyespace.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "movie")
@ToString
public class Book {

    @Id
    private Integer id;
    private String name;
    private String coverUrl;
    private Integer pages;
    public String date;
    public String author;
    @Lob
    public String synopsis;


}