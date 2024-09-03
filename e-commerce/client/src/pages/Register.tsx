import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import client from "../utils/axios";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserTypes>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserTypes> = async (data) => {
    const res = client.post("/auth/register", {
      ...data,
    });
    console.log(data);
    console.log(res);
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
                className="p-2 rounded-md outline-none bg-zinc-800 indent-1"
                {...register("firstName", {
                  required: true,
                })}
              />
              {errors.firstName && (
                <span className="text-red-600 text-sm">
                  This field is required
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
                className="p-2 rounded-md outline-none bg-zinc-800 indent-1"
                {...register("lastName", {
                  required: true,
                })}
              />
              {errors.lastName && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              className="p-2 rounded-md outline-none bg-zinc-800 indent-1"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="p-2 rounded-md outline-none bg-zinc-800 indent-1"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium">
              Phone
            </label>
            <input
              type="text"
              placeholder="+01-1234567890"
              className="p-2 rounded-md outline-none bg-zinc-800 indent-1"
              {...register("phone")}
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-white text-zinc-800 font-medium text-sm w-full hover:bg-zinc-100 hover:text-zinc-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
