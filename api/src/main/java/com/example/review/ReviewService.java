package com.example.review;

import com.example.movie.Movie;
import com.example.movie.MovieRepository;
import com.example.movie.exception.MovieNotFoundException;
import com.example.review.exception.ReviewNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.ws.rs.NotAuthorizedException;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;

    public ReviewService(ReviewRepository reviewRepository, MovieRepository movieRepository) {
        this.reviewRepository = reviewRepository;
        this.movieRepository = movieRepository;
    }

    public Review getReview(Integer id) {
        return reviewRepository.findById(id).orElseThrow(() -> new ReviewNotFoundException(id));
    }

    public Review createReview(Review review, Integer movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new MovieNotFoundException(movieId));
        String userName = getUserNameFromContext();
        review.setMovie(movie);
        review.setUserName(userName);
        return reviewRepository.save(review);
    }

    public Review updateReview(Review review) {
        String userName = getUserNameFromContext();

        if (userName.equals(review.getUserName())) {
            return reviewRepository.save(review);
        }

        throw new NotAuthorizedException("You can update only your reviews");
    }

    public void deleteReview(Review review) {
        String userName = getUserNameFromContext();
        boolean isAdmin = getIsAdminFromContext();

        if (userName.equals(review.getUserName()) || isAdmin) {
            reviewRepository.delete(review);
            return;
        }

        throw new NotAuthorizedException("You can delete only your reviews");
    }

    private String getUserNameFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    private boolean getIsAdminFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_admin"));
    }
}
