package com.example.eyespace.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import javax.persistence.*;
@NoArgsConstructor
@AllArgsConstructor
public class MovieSearchDetails {


    @Id
    private String idIMDB;
    private String title;
    private String year;
    private String posterUrl;

    @Override
    public String toString() {
        return "MovieSearchDetails{" +
                "idIMDB='" + idIMDB + '\'' +
                ", title='" + title + '\'' +
                ", year='" + year + '\'' +
                ", posterUrl='" + posterUrl + '\'' +
                '}';
    }

    public String getIdIMDB() {
        return idIMDB;
    }

    public void setIdIMDB(String idIMDB) {
        this.idIMDB = idIMDB;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }
}