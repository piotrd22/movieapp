package com.example.movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> { // Integer means type of Movie id

    @Query("SELECT m FROM Movie m WHERE " +
            "(m.title ILIKE %:keyword% OR " +
            "m.director ILIKE %:keyword%)" +
            "ORDER BY " +
            "CASE WHEN :sortDirection = 'asc' THEN m.year END ASC, " +
            "CASE WHEN :sortDirection = 'desc' THEN m.year END DESC")
    List<Movie> findByTitleOrDirectorLikeAndSort(String keyword, String sortDirection);

    @Query("SELECT m FROM Movie m " +
            "INNER JOIN m.reviews r " +
            "GROUP BY m.id, m.title, m.director, m.photoUrl, m.year, m.description, m.createdAt, m.updatedAt " +
            "ORDER BY " +
            "CASE WHEN :sortDirection = 'asc' THEN AVG(r.rating) END ASC, " +
            "CASE WHEN :sortDirection = 'desc' THEN AVG(r.rating) END DESC")
    List<Movie> findByOrderByRating(String sortDirection);
}
