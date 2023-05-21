package com.example.movie.dto;

import com.example.review.dto.ReviewDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieDto {
    private Integer id;
    private String title;
    private String director;
    private Integer year;
    private String photoUrl;
    private String description;
    private List<ReviewDto> reviews;
    private Date createdAt;
    private Date updatedAt;
}
