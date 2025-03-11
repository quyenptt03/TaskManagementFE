import { useForm } from "react-hook-form";
import { FormData, RegisterSchema } from "../../../types/auth";
import InputField from "../../../components/form-controls/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "../../../api/auth/query";
import Button from "../../../components/Button";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const signUp = useSignUp();

  const onSubmit = async (data: FormData) => {
    signUp.mutate(data);
  };

  return (
    <div className="bg-white p-10 rounded-e-lg w-full h-full">
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
          <span className="mb mt-5">
            Already have an Account ?{" "}
            <a href="/login" className="font-medium hover:text-[#3674B5]">
              Login
            </a>
          </span>
          <Button theme="filled">Register</Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
