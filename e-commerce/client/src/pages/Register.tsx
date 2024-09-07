import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import client from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

interface UserTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const Register = () => {
  const [user, setUser] = useState<UserTypes>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserTypes>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: (data: UserTypes) => {
      return client.post("/auth/register", {
        ...data,
      });
    },

    onSuccess: () => {
      navigate("/login");
    },
  });

  const onSubmit: SubmitHandler<UserTypes> = async (userData) => {
    try {
      mutation.mutate(userData);
    } catch (error) {
      throw new Error("Unable to register user " + error);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen space-y-8 p-8">
        <h1 className="text-3xl font-semibold max-w-2xl mx-auto">Signup</h1>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <div className="w-full flex gap-6">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="firstName" className="font-medium">
                Firstname
              </label>
              <input
                type="text"
                placeholder="John"
                className={`p-2 rounded-md outline-none indent-1 ${
                  errors.firstName
                    ? "border border-red-500 bg-red-950/20"
                    : "border border-zinc-900 bg-zinc-800"
                }`}
                {...register("firstName", {
                  required: true,
                  validate: {
                    minLength: (v) => v.length >= 5,
                    matchPattern: (v) => /^[a-zA-Z]+$/.test(v),
                  },
                })}
              />
              {errors.firstName?.type === "required" && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
              {errors.firstName?.type === "minLength" && (
                <span className="text-red-600 text-sm">
                  The First name should have at least 5 characters
                </span>
              )}
              {errors.firstName?.type === "matchPattern" && (
                <span className="text-red-600 text-sm">
                  The First name must contain only letters
                </span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="lastName" className="font-medium">
                Lastname
              </label>
              <input
                type="text"
                placeholder="Doe"
                className={`p-2 rounded-md outline-none indent-1 ${
                  errors.lastName
                    ? "border border-red-500 bg-red-950/20"
                    : "border border-zinc-900 bg-zinc-800"
                }`}
                {...register("lastName", {
                  validate: {
                    matchPattern: (v) => v === "" || /^[a-zA-Z]+$/.test(v),
                  },
                })}
              />
              {errors.lastName?.type === "matchPattern" && (
                <span className="text-red-600 text-sm">
                  The Last name must contain only letters
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className={`p-2 rounded-md outline-none indent-1 ${
                errors.email
                  ? "border border-red-500 bg-red-950/20"
                  : "border border-zinc-900 bg-zinc-800"
              }`}
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (v) =>
                    /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(v),
                },
              })}
            />
            {errors.email?.type === "required" && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}

            {errors.email?.type === "matchPattern" && (
              <span className="text-red-600 text-sm">Invalid email</span>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`p-2 rounded-md outline-none indent-1 ${
                errors.password
                  ? "border border-red-500 bg-red-950/20"
                  : "border border-zinc-900 bg-zinc-800"
              }`}
              {...register("password", {
                required: true,
                validate: {
                  // minLength: (v) => v.length >= 5,
                  matchPattern: (v) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/.test(
                      v
                    ),
                },
              })}
            />
            {errors.password?.type === "required" && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}
            {errors.password?.type === "matchPattern" && (
              <span className="text-red-600 text-sm">
                <p className="font-medium text-red-600 text-sm">
                  Password should contain:
                </p>
                <ul>
                  <li className="text-red-600 text-sm">
                    at least a capital letter
                  </li>
                  <li className="text-red-600 text-sm">
                    at least a small letter
                  </li>
                  <li className="text-red-600 text-sm">at least a number</li>
                  <li className="text-red-600 text-sm">
                    at least a special character
                  </li>
                </ul>
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium">
              Phone
            </label>
            <input
              type="number"
              placeholder="+01-1234567890"
              className="p-2 rounded-md outline-none bg-zinc-800 indent-1"
              {...register("phone")}
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-white text-zinc-800 font-medium text-sm w-full hover:bg-zinc-100 hover:text-zinc-700"
          >
            {mutation.isPending ? "Registering" : "Register"}
            {/* Register */}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
