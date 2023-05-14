package com.example.review;

import com.example.review.dto.CreateReviewRequest;
import com.example.review.dto.ReviewDto;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;
    private final ModelMapper modelMapper;

    public ReviewController(ReviewService reviewService, ModelMapper modelMapper) {
        this.reviewService = reviewService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/movie/{id}")
    public List<ReviewDto> getReviewsByMovieId(@PathVariable Integer id) {
        return reviewService.getReviewsByMovieId(id).stream().map(review -> modelMapper.map(review, ReviewDto.class)).toList();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/movie/{id}")
    public ReviewDto createReview(@Valid @RequestBody CreateReviewRequest createReviewRequest, @PathVariable Integer id) {
        Review review = modelMapper.map(createReviewRequest, Review.class);
        review = reviewService.createReview(review, id);
        return modelMapper.map(review, ReviewDto.class);
    }

    @GetMapping("/{id}")
    public ReviewDto getReview(@PathVariable Integer id) {
        Review review = reviewService.getReview(id);
        return modelMapper.map(review, ReviewDto.class);
    }

    @DeleteMapping("/{id}")
    public ReviewDto deleteReview(@PathVariable Integer id) {
        Review review = reviewService.getReview(id);
        reviewService.deleteReview(review);
        return modelMapper.map(review, ReviewDto.class);
    }
}
