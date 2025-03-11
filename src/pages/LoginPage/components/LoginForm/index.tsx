import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, LoginSchema } from "../../../../types/auth";
import InputField from "../../../../components/form-controls/InputField";
import { useSignIn } from "../../../../api/auth/query";
import Button from "../../../../components/Button";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const signIn = useSignIn();

  const onSubmit = async (data: FormData) => {
    signIn.mutate(data);
  };

  return (
    <div className="bg-white p-10 rounded-s-lg h-full w-full">
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
          <span className="mb mt-5">
            Don't have an account?{" "}
            <a href="/register" className="font-medium hover:text-[#3674B5]">
              Register
            </a>
          </span>
          <Button theme="filled">Login</Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
