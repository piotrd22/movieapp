package com.example.review;

import com.example.movie.Movie;
import com.example.movie.MovieRepository;
import com.example.movie.exception.MovieNotFoundException;
import com.example.review.exception.ReviewNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;

    public ReviewService(ReviewRepository reviewRepository, MovieRepository movieRepository) {
        this.reviewRepository = reviewRepository;
        this.movieRepository = movieRepository;
    }

    public List<Review> getReviewsByMovieId(Integer id) {
        if (!movieRepository.existsById(id)) {
            throw new MovieNotFoundException(id);
        }

        return reviewRepository.findByMovieId(id);
    }

    public Review getReview(Integer id) {
        return reviewRepository.findById(id).orElseThrow(() -> new ReviewNotFoundException(id));
    }

    public Review createReview(Review review, Integer id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new MovieNotFoundException(id));
        movie.getReviews().add(review);
        review.setMovie(movie);
        return reviewRepository.save(review);
    }

    public void deleteReview(Review review) {
        Movie movie = movieRepository.findById(review.getId())
                .orElseThrow(() -> new MovieNotFoundException(review.getId()));
        movie.getReviews().remove(review);
        reviewRepository.delete(review);
    }
}
