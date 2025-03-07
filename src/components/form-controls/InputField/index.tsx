import { FormFieldProps } from "../types";

const InputField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      className="py-4 px-6 rounded-lg mt-2 border-solid border-[0.6px] text-sm w-full focus:outline-none"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && (
      <span className="error-message text-sm text-error-dark mt-1">
        {error.message}
      </span>
    )}
  </>
);

export default InputField;
