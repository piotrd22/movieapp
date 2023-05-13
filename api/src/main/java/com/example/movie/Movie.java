package com.example.movie;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

    @Id
    @SequenceGenerator(
            name = "movie_id_sequence",
            sequenceName = "movie_id_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "movie_id_sequence"
    )
    private Integer id;
    private String title;
    private String director;
    private Integer year;
    private String description;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updatedAt", nullable = false)
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        updatedAt = createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }

//    public Movie() {
//    }
//
//    public Movie(Integer id, String title, String director, Integer year, String description, Date createdAt, Date updatedAt) {
//        this.id = id;
//        this.title = title;
//        this.director = director;
//        this.year = year;
//        this.description = description;
//        this.createdAt = createdAt;
//        this.updatedAt = updatedAt;
//    }
//
//    public Integer getId() {
//        return id;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getDirector() {
//        return director;
//    }
//
//    public void setDirector(String director) {
//        this.director = director;
//    }
//
//    public Integer getYear() {
//        return year;
//    }
//
//    public void setYear(Integer year) {
//        this.year = year;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public Date getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(Date createdAt) {
//        this.createdAt = createdAt;
//    }
//
//    public Date getUpdatedAt() {
//        return updatedAt;
//    }
//
//    public void setUpdatedAt(Date updatedAt) {
//        this.updatedAt = updatedAt;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        Movie movie = (Movie) o;
//        return Objects.equals(id, movie.id) && Objects.equals(title, movie.title) && Objects.equals(director, movie.director) && Objects.equals(year, movie.year) && Objects.equals(description, movie.description) && Objects.equals(createdAt, movie.createdAt) && Objects.equals(updatedAt, movie.updatedAt);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(id, title, director, year, description, createdAt, updatedAt);
//    }
//
//    @Override
//    public String toString() {
//        return "Movie{" +
//                "id=" + id +
//                ", title='" + title + '\'' +
//                ", director='" + director + '\'' +
//                ", year=" + year +
//                ", description='" + description + '\'' +
//                ", createdAt=" + createdAt +
//                ", updatedAt=" + updatedAt +
//                '}';
//    }
}
