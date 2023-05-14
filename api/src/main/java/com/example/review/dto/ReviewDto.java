package com.example.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private Integer id;
    private Integer movieId;
    private Double rating;
    private String description;
    private Date createdAt;
    private Date updatedAt;
}
