import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import Swal from "sweetalert2";
import { notify, notifyError } from "../helpers/Notifiers";

function Movie({ movie, setMovies }) {
  const { keycloak } = useKeycloak();

  const rating =
    movie.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
    movie.reviews.length;

  const isAdmin = keycloak.authenticated && keycloak.hasRealmRole("app_admin");

  const fetchDeleteMovie = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + keycloak.token,
      },
    };

    const res = await axios.delete(
      import.meta.env.VITE_API + "/movie/" + movie.id,
      config
    );
    return res.data;
  };

  const deleteMovie = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchDeleteMovie()
          .then(() => {
            notify("Movie has been deleted");
            setMovies((prev) => prev.filter((x) => x.id !== movie.id));
          })
          .catch((error) => {
            notifyError("Error while deleting movie");
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl m-10">
      <figure>
        <img
          src={`${movie.photoUrl}`}
          alt="Album"
          className="w-72 h-60 lg:w-96 lg:h-80"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {movie.title} ({movie.year})
        </h2>
        <p>Director: {movie.director}</p>
        {!!rating && <p>Rating: {rating}</p>}
        <div className="card-actions justify-end">
          {isAdmin && (
            <div>
              <a href={`/movie/${movie.id}`} className="mr-2 btn btn-secondary">
                Update
              </a>
              <button onClick={deleteMovie} className="btn btn-accent">
                &#10005;
              </button>
            </div>
          )}
          <a href={`/more/${movie.id}`} className="btn btn-primary">
            More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Movie;
