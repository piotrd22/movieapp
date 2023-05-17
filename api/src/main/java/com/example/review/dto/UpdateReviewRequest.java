package com.example.review.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateReviewRequest {
    @Min(value = 0, message = "Rating should be higher than 0")
    @Max(value = 10, message = "Rating should be lower than 10")
    private Double rating;

    @Size(min = 10, max = 1000, message
            = "Description must be between 10 and 1000 characters")
    private String description;
}
