import React, { useId } from "react";

const CustomInput = ({
  name,
  register,
  errors,
  label,
  type = "text",
  className = "w-full",
  icon = null,
  onClick = null,
}) => {
  const id = useId();

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        id={id}
        placeholder=" " // needed for floating label trick
        {...register(name)}
        className={`peer border-2 outline-none px-2 py-4 rounded-lg w-full
          ${errors[name] ? "border-red-500" : "border-blue-400"} 
          focus:border-blue-600`}
      />
      <label
        htmlFor={id}
        className={`absolute left-2 top-2 px-1 text-gray-500 transition-all
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600
          peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-gray-700
          bg-white`}
      >
        {label}
      </label>
      {icon && (
        <button
          onClick={onClick}
          type="button"
          className="absolute top-4 right-5"
        >
          {icon}
        </button>
      )}
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
