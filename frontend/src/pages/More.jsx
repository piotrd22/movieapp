import axios from "axios";
import { notify, notifyError } from "../helpers/Notifiers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../components/Review";
import { useKeycloak } from "@react-keycloak/web";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";

function More() {
  const { id } = useParams();
  const { keycloak } = useKeycloak();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getMovie = async () => {
    const res = await axios.get(import.meta.env.VITE_API + "/movie/" + id);
    setIsLoading(false);
    return res.data;
  };

  const calculateRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / reviews.length;
  };

  useEffect(() => {
    getMovie()
      .then((movie) => {
        setMovie(movie);
        setReviews(movie.reviews);
        const ratingNum = calculateRating(movie.reviews);
        setRating(ratingNum);
      })
      .catch((error) => console.log(error));
  }, []);

  const reviewsComponent = reviews?.map((review, index) => {
    return <Review key={index} review={review} setReviews={setReviews} />;
  });

  const createReview = async (data) => {
    const config = {
      headers: {
        Authorization: "Bearer " + keycloak.token,
      },
    };

    const res = await axios.post(
      import.meta.env.VITE_API + "/review/" + id,
      data,
      config
    );
    return res.data;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      rating: 0,
      description: "",
    },
  });

  const onSubmit = (data) => {
    createReview(data)
      .then((review) => {
        notify("Review has been added!");
        setReviews([...reviews, review]);
        reset();
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          notifyError("Unauthorized!");
        } else if (error.response?.status === 409) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Error with adding review!");
        }
      });
  };

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop } = document.documentElement;
      if (scrollTop === 0) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  });

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-5">
      <a href="/" className="btn btn-primary">
        &#8592; Back
      </a>
      <div className="card lg:card-side bg-base-100 shadow-xl m-10">
        <div className="card-body">
          <h2 className="card-title">
            {movie?.title} ({movie?.year})
          </h2>
          <p>Director: {movie?.director}</p>
          {!!rating && <p>Rating: {rating.toFixed(2)}</p>}
          <p>Description: {movie?.description}</p>
        </div>
        <p className="m-3 text-right">
          {new Date(movie?.updatedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box p-3 my-6">
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-xl font-medium relative ">
          Add review +
        </div>
        <div className="collapse-content">
          <form
            className="sm:w-full lg:w-1/2 flex flex-col justify-items-center mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="mt-5 mb-2">Description</label>

            <input
              placeholder="description..."
              className="input input-bordered w-full"
              type="text"
              {...register("description", {
                required: "This field is required!",
                pattern: {
                  value: /^[^\s]+(?:$|.*[^\s]+$)/g,
                  message: "This field can't start or end with whitespace!",
                },
              })}
            />
            {errors.description && (
              <div className="my-2">{errors.description.message}</div>
            )}
            <label className="mt-5 mb-2">Rating</label>
            <input
              className="input input-bordered w-full"
              type="number"
              min="0"
              max="10"
              step="0.5"
              {...register("rating", {
                required: "This field is required!",
              })}
            />
            {errors.rating && (
              <div className="my-2">{errors.rating.message}</div>
            )}
            <button type="submit" className="btn btn-primary my-5 mx-auto flex">
              ADD REVIEW
            </button>
          </form>
        </div>
      </div>

      {reviews.length > 0 && <h2 className="text-2xl mt-20">Reviews: </h2>}
      {reviewsComponent}
      {!isTop && (
        <button
          className="btn btn-square fixed bottom-3 right-3 z-50 "
          onClick={goToTop}
        >
          &#8593;
        </button>
      )}
    </div>
  );
}

export default More;
