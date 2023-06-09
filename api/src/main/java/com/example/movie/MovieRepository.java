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

}
