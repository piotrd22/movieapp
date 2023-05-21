package com.example.movie.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateMovieRequest {

    @Size(min = 1, message = "Title must be higher than 0 characters")
    private String title;

    @Size(min = 1, message = "Director must be higher than 0 characters")
    private String director;

    @Min(value = 1800, message = "Year should not be less than 1800")
    private Integer year;

    @Size(min = 1, message = "Photo Url must be higher than 0 characters")
    private String photoUrl;

    @Size(min = 10, max = 1000, message
            = "Description must be between 10 and 1000 characters")
    private String description;
}
