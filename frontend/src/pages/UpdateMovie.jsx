import { useForm } from "react-hook-form";
import { useKeycloak } from "@react-keycloak/web";
import { notify, notifyError } from "../helpers/Notifiers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function UpdateMovie() {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const { id } = useParams();

  const getMovie = async () => {
    const res = await axios.get(import.meta.env.VITE_API + "/movie/" + id);
    return res.data;
  };

  useEffect(() => {
    getMovie()
      .then((movie) => {
        setValue("title", movie.title, { shouldTouch: true });
        setValue("director", movie.director, { shouldTouch: true });
        setValue("year", movie.year, { shouldTouch: true });
        setValue("description", movie.description, { shouldTouch: true });
        setValue("photoUrl", movie.photoUrl, { shouldTouch: true });
      })
      .catch((error) => console.log(error));
  }, []);

  const updateMovie = async (data) => {
    const config = {
      headers: {
        Authorization: "Bearer " + keycloak.token,
      },
    };

    const res = await axios.put(
      import.meta.env.VITE_API + "/movie/" + id,
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
      title: "",
      director: "",
      year: "",
      description: "",
      photoUrl: "",
    },
  });

  const onSubmit = (data) => {
    updateMovie(data)
      .then(() => {
        notify("Movie has been updated");
        navigate("/");
        reset();
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          notifyError("Unauthorized!");
        } else {
          notifyError("Error with updating movie");
        }
      });
  };

  return (
    <div className="container mx-auto p-5">
      <a href="/" className="btn btn-primary">
        &#8592; Back
      </a>
      <form
        className="sm:w-full lg:w-1/2 flex flex-col justify-items-center mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="mt-5 mb-2">Title</label>
        <input
          className="input input-bordered w-full"
          type="text"
          {...register("title", {
            required: "This field is required!",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/g,
              message: "This field can't start or end with whitespace!",
            },
          })}
        />
        {errors.title && <div className="my-2">{errors.title.message}</div>}
        <label className="mt-5 mb-2">Director</label>
        <input
          className="input input-bordered w-full"
          type="text"
          {...register("director", {
            required: "This field is required!",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/g,
              message: "This field can't start or end with whitespace!",
            },
          })}
        />
        <label className="mt-5 mb-2">Year</label>
        <input
          className="input input-bordered w-full"
          type="number"
          min="1800"
          max="2050"
          step="1"
          {...register("year", {
            required: "This field is required!",
          })}
        />
        {errors.year && <div className="my-2">{errors.year.message}</div>}
        <label className="mt-5 mb-2">Descrpition</label>
        <textarea
          className="input input-bordered w-full"
          type="text"
          {...register("description", {
            required: "This field is required!",
          })}
        />
        {errors.description && (
          <div className="my-2">{errors.description.message}</div>
        )}
        <label className="mt-5 mb-2">Photo url</label>
        <input
          className="input input-bordered w-full"
          type="text"
          {...register("photoUrl", {
            required: "This field is required!",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/g,
              message: "This field can't start or end with whitespace!",
            },
          })}
        />
        <button className="btn btn-primary my-5 mx-auto flex">UPDATE</button>
      </form>
    </div>
  );
}

export default UpdateMovie;
