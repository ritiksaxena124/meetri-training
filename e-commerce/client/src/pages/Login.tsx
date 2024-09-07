import { useForm, SubmitHandler } from "react-hook-form";
import client from "../utils/axios";
import { useNavigate } from "react-router-dom";

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
      <div className="w-full min-h-screen space-y-8 p-8">
        <h1 className="text-3xl font-semibold max-w-2xl mx-auto">Login</h1>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              className={`p-2 rounded-md outline-none indent-1 ${
                errors.email
                  ? "border border-red-500 bg-red-950/20"
                  : "border border-zinc-900 bg-zinc-800"
              }`}
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
              className={`p-2 rounded-md outline-none indent-1 ${
                errors.password
                  ? "border border-red-500 bg-red-950/20"
                  : "border border-zinc-900 bg-zinc-800"
              }`}
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

export default Login;
