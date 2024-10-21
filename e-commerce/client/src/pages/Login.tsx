import { useForm, SubmitHandler } from "react-hook-form";
import client from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";

interface UserTypes {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserTypes>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserTypes> = async (data) => {
    await client.post("/auth/login", {
      ...data,
    });

    navigate("/");
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center p-8">
        <div className="w-full space-y-8">
          <h1 className="text-3xl font-semibold max-w-md mx-auto">
            Welcome Back 👋
          </h1>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
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
                })}
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              type="submit"
              className="px-3 py-2 rounded-md bg-white text-zinc-800 font-medium text-sm w-full hover:bg-zinc-100 hover:text-zinc-700"
            >
              Login
            </button>
          </form>
          <div className="flex items-center justify-center">
            <span className="mr-2 text-center text-zinc-400">
              Don't have an account?
            </span>
            <Link to="/register" className="hover:underline">
              create an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
