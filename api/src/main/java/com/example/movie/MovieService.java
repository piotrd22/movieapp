package com.example.movie;

import com.example.movie.exception.MovieNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    public List<Movie> searchMovies(String keyword, String sortDirection) {
        return movieRepository.findByTitleOrDirectorLikeAndSort(keyword, sortDirection);
    }

    public Movie getMovie(Integer id) {
        return movieRepository.findById(id).orElseThrow(() -> new MovieNotFoundException(id));
    }

    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public void deleteMovie(Movie movie) {
        movieRepository.delete(movie);
    }

    public List<Movie> getTopMovies(String sortDirection) {
        return movieRepository.findByOrderByRating(sortDirection);
    }
}
