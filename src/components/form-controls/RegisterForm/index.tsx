import { useForm } from "react-hook-form";
import { FormData, RegisterSchema } from "../types";
import InputField from "../InputField";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("SUCCESS", data);
  };

  return (
    <div className="bg-white p-10 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid col-auto w-80 border-black">
          <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>

          <label htmlFor="email" className="text-base capitalize">
            Email
          </label>
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />

          <label htmlFor="password" className="text-base capitalize mt-3">
            Password
          </label>
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />

          <label
            htmlFor="confirmPassword"
            className="text-base capitalize mt-3"
          >
            Confirm Password
          </label>
          <InputField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="mt-5 px-8 py-4 font-semibold border border-solid border-transparent rounded-lg laptop:px-10 laptop:py-5 3xl:px-12 3xl:py-6 
            text-white bg-black hover:text-black hover:bg-white hover:border-black transition-all duration-200 ease-linear"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
