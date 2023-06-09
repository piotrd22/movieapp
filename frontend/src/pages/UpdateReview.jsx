import { useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useForm } from "react-hook-form";
import { notify, notifyError } from "../helpers/Notifiers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function UpdateReview() {
  const { id, movieId } = useParams();
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const getReview = async () => {
    const res = await axios.get(import.meta.env.VITE_API + "/review/" + id);
    return res.data;
  };

  useEffect(() => {
    getReview()
      .then((review) => {
        setValue("rating", review.rating, { shouldTouch: true });
        setValue("description", review.description, { shouldTouch: true });
      })
      .catch((error) => console.log(error));
  }, []);

  const updateReview = async (data) => {
    const config = {
      headers: {
        Authorization: "Bearer " + keycloak.token,
      },
    };

    const res = await axios.put(
      import.meta.env.VITE_API + "/review/" + id,
      data,
      config
    );
    return res.data;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      rating: 0,
      description: "",
    },
  });

  const onSubmit = (data) => {
    updateReview(data)
      .then(() => {
        notify("Review has been updated!");
        navigate(`/more/${movieId}`);
        reset();
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          notifyError("Unauthorized!");
        } else {
          notifyError("Error with updating review!");
        }
      });
  };

  return (
    <div className="container mx-auto p-5">
      <a href={`/more/${movieId}`} className="btn btn-primary">
        &#8592; Back
      </a>
      <form
        className="mt-6 sm:w-full lg:w-1/2 flex flex-col justify-items-center mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center">
          <input
            placeholder="description..."
            className="input input-bordered w-9/12 sm:w-10/12 my-3"
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
        </div>
        <div className="flex items-center">
          <input
            className="input input-bordered w-9/12 sm:w-10/12 my-3"
            type="number"
            min="0"
            max="10"
            step="0.5"
            {...register("rating", {
              required: "This field is required!",
            })}
          />
          {errors.rating && <div className="my-2">{errors.rating.message}</div>}
        </div>
        <div className="flex">
          <button type="submit" className="btn btn-primary my-5">
            UPDATE REVIEW
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateReview;
