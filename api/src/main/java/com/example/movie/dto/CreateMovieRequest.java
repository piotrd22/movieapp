package com.example.movie.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateMovieRequest {

    @NotNull(message = "Title cannot be null")
    @Size(min = 1, message = "Title must be higher than 0 characters")
    private String title;

    @NotNull(message = "Director cannot be null")
    @Size(min = 1, message = "Director must be higher than 0 characters")
    private String director;

    @NotNull(message = "Photo Url cannot be null")
    @Size(min = 1, message = "Photo Url must be higher than 0 characters")
    private String photoUrl;

    @NotNull(message = "Year cannot be null")
    @Min(value = 1800, message = "Year should not be less than 1800")
    private Integer year;

    @Size(min = 10, max = 3000, message
            = "Description must be between 10 and 3000 characters")
    private String description;
}
