package com.example.movie;

import com.example.movie.dto.CreateMovieRequest;
import com.example.movie.dto.MovieDto;
import com.example.movie.dto.UpdateMovieRequest;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/movie")
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

    @GetMapping("/search")
    public List<MovieDto> searchMovies(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "sort", defaultValue = "asc") String sortDirection
    ) {
        return movieService.searchMovies(keyword, sortDirection).stream().map(movie -> modelMapper.map(movie, MovieDto.class)).toList();
    }

    @GetMapping("/topmovies")
    public List<MovieDto> getTopMovies(@RequestParam(name = "sort", defaultValue = "desc") String sortDirection) {
        return movieService.getTopMovies(sortDirection).stream().map(movie -> modelMapper.map(movie, MovieDto.class)).toList();
    }

    @GetMapping("/{id}")
    public MovieDto getMovie(@PathVariable Integer id) {
        Movie movie = movieService.getMovie(id);
        return modelMapper.map(movie, MovieDto.class);
    }

    @PutMapping("/{id}")
    public MovieDto updateMovie(@PathVariable Integer id, @Valid @RequestBody UpdateMovieRequest updateMovieRequest) {
        Movie movie = movieService.getMovie(id);
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(updateMovieRequest, movie);
        movie = movieService.createMovie(movie);
        return modelMapper.map(movie, MovieDto.class);
    }

    @DeleteMapping("/{id}")
    public MovieDto deleteMovie(@PathVariable Integer id) {
        Movie movie = movieService.getMovie(id);
        movieService.deleteMovie(movie);
        return modelMapper.map(movie, MovieDto.class);
    }
}
