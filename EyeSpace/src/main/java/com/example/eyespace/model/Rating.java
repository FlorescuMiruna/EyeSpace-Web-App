package com.example.eyespace.model;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer ratingValue = 0;

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
        return "Rating{" +
                "id=" + id +
                ", ratingValue=" + ratingValue +
                ", movie=" + movie.getId() +
                ", user=" + user.getUsername() +
                '}';
    }
}
