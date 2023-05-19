package com.example.review;

import com.example.review.dto.CreateReviewRequest;
import com.example.review.dto.ReviewDto;
import com.example.review.dto.UpdateReviewRequest;
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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{movieId}")
    public ReviewDto createReview(@PathVariable Integer movieId, @Valid @RequestBody CreateReviewRequest createReviewRequest) {
        Review review = modelMapper.map(createReviewRequest, Review.class);
        review = reviewService.createReview(review, movieId);
        return modelMapper.map(review, ReviewDto.class);
    }

    @GetMapping("/{id}")
    public ReviewDto getReview(@PathVariable Integer id) {
        Review review = reviewService.getReview(id);
        return modelMapper.map(review, ReviewDto.class);
    }

    @PutMapping("/{id}")
    public ReviewDto updateReview(@PathVariable Integer id, @Valid @RequestBody UpdateReviewRequest updateReviewRequest) {
        Review review = reviewService.getReview(id);
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(updateReviewRequest, review);
        review = reviewService.updateReview(review);
        return modelMapper.map(review, ReviewDto.class);
    }

    @DeleteMapping("/{id}")
    public ReviewDto deleteReview(@PathVariable Integer id) {
        Review review = reviewService.getReview(id);
        reviewService.deleteReview(review);
        return modelMapper.map(review, ReviewDto.class);
    }

    @GetMapping("/username/{username}")
    public List<ReviewDto> getReviewsByUsername(@PathVariable String username) {
        List<Review> reviews = reviewService.getReviewsByUsername(username);
        return reviews.stream().map(review -> modelMapper.map(review, ReviewDto.class)).toList();
    }
}
