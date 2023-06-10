import { useForm } from "react-hook-form";
import { useKeycloak } from "@react-keycloak/web";
import { notify, notifyError } from "../helpers/Notifiers";
import axios from "axios";

function AddMovieForm() {
  const { keycloak } = useKeycloak();

  const addMovie = async (data) => {
    const config = {
      headers: {
        Authorization: "Bearer " + keycloak.token,
      },
    };

    const res = await axios.post(
      import.meta.env.VITE_API + "/movie",
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
      title: "",
      director: "",
      year: "",
      description: "",
      photoUrl:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    },
  });

  const onSubmit = (data) => {
    addMovie(data)
      .then(() => {
        notify("Movie has been added");
        reset();
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          notifyError("Unauthorized!");
        } else {
          notifyError("Error with adding movie");
        }
      });
  };

  return (
    <div className="container mx-auto p-5">
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
        <button className="btn btn-primary my-5 mx-auto flex">ADD</button>
      </form>
    </div>
  );
}

export default AddMovieForm;
