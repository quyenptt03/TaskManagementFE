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
        className="mt-5 px-8 py-4 font-semibold border border-solid border-transparent rounded-lg laptop:px-10 laptop:py-5 3xl:px-12 3xl:py-6 
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
        className="w-full px-4 py-3 leading-5 bg-white text-black border-black border-solid 3xl:text-lg laptop:text-sm hover:text-white hover:bg-black hover:border-transparent"
      >
        {children}
      </button>
    );
};

export default Button;
