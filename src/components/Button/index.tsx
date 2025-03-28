interface IButtonProps {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  theme: "base" | "filled" | "noBg";
  children: any;
}

const Button = (props: IButtonProps) => {
  const { theme, children, type, onClick, className } = props;
  if (theme === "filled")
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-8 py-4 font-semibold border border-solid border-transparent rounded-lg laptop:px-10 laptop:py-4 3xl:px-12 3xl:py-6 
            text-white bg-black hover:text-black hover:bg-white hover:border-black transition-all duration-200 ease-linear ${className}`}
      >
        {children}
      </button>
    );
  else if (theme === "base")
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-8 py-4 font-semibold border border-solid border-transparent rounded-lg laptop:px-10 laptop:py-4 3xl:px-12 3xl:py-6 
            text-black bg-white hover:text-white hover:bg-black hover:border-black transition-all duration-200 ease-linear ${className}`}
      >
        {children}
      </button>
    );
  else {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`my-4 font-semibold rounded-lg  text-black  hover:text-[#4D55CC]   transition-all duration-200 ease-linear ${className}`}
      >
        {children}
      </button>
    );
  }
};

export default Button;
