package com.example.eyespace.model;

import lombok.*;

import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class BookSearchDetails {

    @Id
    private Integer id;
    private String name;
    private String coverUrl;
    private Integer year;


}