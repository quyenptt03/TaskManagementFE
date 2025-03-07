import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, LoginSchema } from "../../../../types/auth";
import InputField from "../../../../components/form-controls/InputField";
import { useSignIn } from "../../../../api/auth/query";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const signIn = useSignIn();

  const onSubmit = async (data: FormData) => {
    signIn.mutate(data);
    console.log("SUCCESS", data);
  };

  return (
    <div className="bg-white p-10 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid col-auto w-80 border-black">
          <h1 className="text-2xl font-medium mb-4 text-center">Login</h1>

          <label htmlFor="email" className="text-base font-medium capitalize">
            Email
          </label>
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />

          <label
            htmlFor="password"
            className="text-base font-medium capitalize mt-3"
          >
            Password
          </label>
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />

          <button
            type="submit"
            className="mt-5 px-8 py-4 font-semibold border border-solid border-transparent rounded-lg laptop:px-10 laptop:py-5 3xl:px-12 3xl:py-6 
            text-white bg-black hover:text-black hover:bg-white hover:border-black transition-all duration-200 ease-linear"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
