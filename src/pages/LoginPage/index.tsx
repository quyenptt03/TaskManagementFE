import LoginForm from "./components/LoginForm";
import bg from "../../assets/sea.jpg";
const LoginPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-between p-32 bg-[#D9EAFD]">
      <div className="flex w-[50rem] h-[30rem]">
        <div className="w-1/2 h-full">
          <LoginForm />
        </div>
        <img
          src={bg}
          alt="Register background"
          className="hidden laptop:block rounded-e-lg w-1/2"
        />
      </div>
    </div>
  );
};

export default LoginPage;
