interface IButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  theme: "base" | "filled";
  children: any;
}

const Button = (props: IButtonProps) => {
  const { theme, children, type, onClick } = props;
  if (theme === "filled")
    return (
      <button
        type={type}
        onClick={onClick}
        className="mt-4 px-8 py-4 font-semibold border border-solid border-transparent rounded-lg laptop:px-10 laptop:py-4 3xl:px-12 3xl:py-6 
            text-white bg-black hover:text-black hover:bg-white hover:border-black transition-all duration-200 ease-linear w-full"
      >
        {children}
      </button>
    );
  else
    return (
      <button
        type={type}
        onClick={onClick}
        className="mt-4 px-8 py-4 font-semibold border border-solid border-transparent rounded-lg laptop:px-10 laptop:py-4 3xl:px-12 3xl:py-6 
            text-black bg-white hover:text-white hover:bg-black hover:border-black transition-all duration-200 ease-linear w-full"
      >
        {children}
      </button>
    );
};

export default Button;
