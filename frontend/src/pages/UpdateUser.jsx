import { notify, notifyError } from "../helpers/Notifiers";
import PasswordStrengthBar from "react-password-strength-bar";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";
import { useParams } from "react-router-dom";

function UpdateUser() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const { id } = useParams();

  const updateUser = async (data) => {
    const config = {
      headers: {
        Authorization: "Bearer " + keycloak.token,
      },
    };

    const res = await axios.put(
      `${import.meta.env.VITE_API}/user/${id}`,
      data,
      config
    );
    return res.data;
  };

  const getUser = async () => {
    const res = await axios.get(import.meta.env.VITE_API + "/user/" + id);
    return res.data;
  };

  useEffect(() => {
    getUser()
      .then((user) => {
        setValue("email", user.email, { shouldTouch: true });
        setValue("firstName", user.firstName, { shouldTouch: true });
        setValue("lastName", user.lastName, { shouldTouch: true });
      })
      .catch((error) => console.log(error));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data) => {
    if (password === "") {
      delete data.password;
    }

    updateUser(data)
      .then(() => {
        notify("User has been updated");
        reset();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.data?.message) {
          notifyError(error.response.data.message);
        } else if (error.response?.data?.detail) {
          notifyError(error.response.data.detail);
        } else {
          notifyError("Error with updating!");
        }
      });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center mt-3 mb-3 text-3xl">UPDATE</h1>
      <form
        className="sm:w-full lg:w-1/2 flex flex-col justify-items-center mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="mt-5 mb-2">Email</label>
        <input
          className="input input-bordered w-full"
          type="text"
          {...register("email", {
            required: "This field is required!",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/g,
              message: "This field can't start or end with whitespace!",
            },
          })}
        />
        <label className="mt-5 mb-2">First name</label>
        <input
          className="input input-bordered w-full"
          type="text"
          {...register("firstName", {
            required: "This field is required!",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/g,
              message: "This field can't start or end with whitespace!",
            },
          })}
        />
        {errors.firstName && (
          <div className="my-2">{errors.firstName.message}</div>
        )}
        <label className="mt-5 mb-2">Last name</label>
        <input
          className="input input-bordered w-full"
          type="text"
          {...register("lastName", {
            required: "This field is required!",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/g,
              message: "This field can't start or end with whitespace!",
            },
          })}
        />
        {errors.lastName && (
          <div className="my-2">{errors.lastName.message}</div>
        )}
        {errors.email && <div className="my-2">{errors.email.message}</div>}
        <label className="mt-5 mb-2">Password (min 8 characters)</label>
        <input
          type="password"
          className="input input-bordered w-full"
          {...register("password", {
            onChange: (e) => setPassword(e.target.value),
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/g,
              message: "This field can't start or end with whitespace!",
            },
          })}
        />
        <PasswordStrengthBar password={password} className="mt-2" />
        {errors.password && (
          <div className="mb-2">{errors.password.message}</div>
        )}
        <button className="btn btn-primary my-5 mx-auto flex">UPDATE</button>
      </form>
    </div>
  );
}

export default UpdateUser;
