package com.example.movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository
        extends JpaRepository<Movie, Integer> { // Integer means type of Movie id
}
