import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-32 bg-[#D9EAFD]">
      <LoginForm />;
      {/* <img src={LoginBG} alt="Register background" className="ml-[7%] hidden laptop:block"/> */}
    </div>
  );
};

export default LoginPage;
