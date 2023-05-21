import { notify, notifyError } from "../helpers/Notifiers";
import { useKeycloak } from "@react-keycloak/web";
import PasswordStrengthBar from "react-password-strength-bar";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const { keycloak } = useKeycloak();
  const [password, setPassword] = useState("");

  const createUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/user`, data);
    return res.data;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data) => {
    createUser(data)
      .then(() => {
        notify("User has been created");
        reset();
        keycloak.login();
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          notifyError(error.response.data.message);
        } else if (error.response?.data?.detail) {
          notifyError(error.response.data.detail);
        } else {
          notifyError("Error with signing up!");
        }
      });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center mt-3 mb-3 text-3xl">SIGN UP</h1>
      <form
        className="sm:w-full lg:w-1/2 flex flex-col justify-items-center mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="mt-5 mb-2">Username</label>
        <input
          className="input input-bordered w-full"
          type="text"
          {...register("username", {
            required: "This field is required!",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/g,
              message: "This field can't start or end with whitespace!",
            },
          })}
        />
        {errors.username && (
          <div className="my-2">{errors.username.message}</div>
        )}
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
            required: "This field is required!",
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
        <button className="btn btn-primary my-5 mx-auto flex">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
