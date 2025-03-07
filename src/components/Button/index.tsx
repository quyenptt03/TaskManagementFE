interface IButtonProps {
  theme: "base" | "filled";
  children: any;
}

const Button = (props: IButtonProps) => {
  const { theme, children } = props;
  if (theme === "filled")
    return (
      <button className="px-8 py-4 border-transparent laptop:px-10 laptop:py-5 3xl:px-12 3xl:py-6 text-white bg-black hover:text-black hover:bg-white hover:border-black">
        {children}
      </button>
    );
  else
    return (
      <button className="px-4 py-3 leading-5 bg-white text-black border-black border-solid 3xl:text-lg laptop:text-sm hover:text-white hover:bg-black hover:border-transparent">
        {children}
      </button>
    );
};

export default Button;
