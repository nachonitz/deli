import React from "react";
import { FieldError } from "react-hook-form";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  error?: FieldError;
  register: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  error,
  register,
}) => {
  return (
    <div className="mb-4">
      <label className="text-secondary">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border p-2 rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default InputField;
