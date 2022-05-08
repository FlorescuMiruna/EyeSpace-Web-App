package com.example.eyespace.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String id;

    private String title;
    private String director;
    private String genre;
    private String date;

    @Lob
    @Column( name = "plot")
    private String plot;

    private String rating;
    private String posterUrl;

    private Integer duration = 0;

//    @ElementCollection
//    private Set<Long> favorites = new HashSet<>();


    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "movie_user_1",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private  Set<User> users1 = new HashSet<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "movie_user_2",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private  Set<User> users2 = new HashSet<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "movie_user_3",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private  Set<User> users3 = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "movie",cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

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
                ", duration=" + duration +
                ", users1=" + users1 +
                ", users2=" + users2 +
                ", comments=" + comments +
                '}';
    }
}