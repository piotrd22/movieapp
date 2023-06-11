import { useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useForm } from "react-hook-form";
import { notify, notifyError } from "../helpers/Notifiers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function UpdateReview() {
  const { id } = useParams();
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
        navigate(`/myreviews`);
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
      <h1 className="text-center mt-3 mb-3 text-3xl">UPDATE REVIEW</h1>
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
        {errors.rating && <div className="my-2">{errors.rating.message}</div>}
        <button type="submit" className="btn btn-primary my-5 mx-auto flex">
          UPDATE REVIEW
        </button>
      </form>
    </div>
  );
}

export default UpdateReview;
