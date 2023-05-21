function Movie({ movie }) {
  const rating =
    movie.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
    movie.reviews.length;

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl m-10">
      <figure>
        <img src={`${movie.photoUrl}`} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {movie.title} ({movie.year})
        </h2>
        <p>Director: {movie.director}</p>
        {!!rating && <p>Rating: {rating}</p>}
        <div className="card-actions justify-end">
          <a href={`/more/${movie.id}`} className="btn btn-primary">
            More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Movie;
