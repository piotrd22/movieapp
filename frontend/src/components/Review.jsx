import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import Swal from "sweetalert2";
import { notify, notifyError } from "../helpers/Notifiers";
import { useEffect, useState } from "react";

function Review({ review, setReviews, movieTitle }) {
  const { keycloak } = useKeycloak();
  const [mTitle, setMTitle] = useState("");

  const fetchDeleteReview = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + keycloak.token,
      },
    };

    const res = await axios.delete(
      import.meta.env.VITE_API + "/review/" + review.id,
      config
    );
    return res.data;
  };

  const deleteReview = () => {
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
        fetchDeleteReview()
          .then(() => {
            notify("Review has been deleted");
            setReviews((prev) => prev.filter((x) => x.id !== review.id));
          })
          .catch((error) => {
            notifyError("Error while deleting review");
            console.log(error);
          });
      }
    });
  };

  if (movieTitle) {
    const getMovieTitle = async () => {
      const res = await axios.get(
        import.meta.env.VITE_API + "/movie/" + review.movieId
      );
      return res.data.title;
    };

    useEffect(() => {
      getMovieTitle()
        .then((movieTitle) => setMTitle(movieTitle))
        .catch((error) => console.log(error));
    });
  }

  return (
    <div className="flex flex-wrap border border-base-300 bg-base-100 rounded-box p-3 m-3">
      <div className="w-full">
        <div className="font-bold text-lg m-2">{review.userName}</div>
        <div className="m-2">{review.description}</div>
        <div className="m-2">Rating: {review.rating}</div>
      </div>
      <div className="w-full mt-2">
        {!movieTitle ? (
          <div className="flex items-center justify-end">
            <div>
              <a
                href={`/review/${review.movieId}/${review.id}`}
                className="mr-2 btn btn-secondary"
              >
                Update
              </a>
              <button onClick={deleteReview} className="mr-2 btn btn-accent">
                &#10005;
              </button>
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="ml-2">To: {mTitle}</div>
            <div>
              <a
                href={`/review/${review.movieId}/${review.id}`}
                className="mr-2 btn btn-secondary"
              >
                Update
              </a>
              <button onClick={deleteReview} className="mr-2 btn btn-accent">
                &#10005;
              </button>
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;
