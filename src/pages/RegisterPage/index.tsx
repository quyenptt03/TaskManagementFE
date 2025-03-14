import RegisterForm from "./RegisterForm";
import bg from "../../assets/sea.jpg";

const RegisterPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-between p-32 bg-[#D9EAFD]">
      <div className="flex w-[54rem] min-h-[35rem]">
        <img
          src={bg}
          alt="Register background"
          className="hidden laptop:block rounded-s-lg w-1/2"
        />

        <div className="w-1/2 h-full">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
