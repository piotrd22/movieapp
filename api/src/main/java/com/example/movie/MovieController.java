package com.example.movie;

import com.example.movie.dto.CreateMovieRequest;
import com.example.movie.dto.MovieDto;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/movie")
public class MovieController {
    private final MovieService movieService;
    private final ModelMapper modelMapper;

    public MovieController(MovieService movieService, ModelMapper modelMapper) {
        this.movieService = movieService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public List<MovieDto> getMovies() {
        return movieService.getMovies().stream().map(movie -> modelMapper.map(movie, MovieDto.class)).toList();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public MovieDto createMovie(@Valid @RequestBody CreateMovieRequest createMovieRequest) {
        Movie movie = modelMapper.map(createMovieRequest, Movie.class);
        movie = movieService.createMovie(movie);
        return modelMapper.map(movie, MovieDto.class);
    }

    @GetMapping("/{id}")
    public MovieDto getMovie(@PathVariable Integer id) {
        Movie movie = movieService.getMovie(id);
        return modelMapper.map(movie, MovieDto.class);
    }
}
