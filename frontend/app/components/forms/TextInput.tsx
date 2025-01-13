import React from "react";
import { Field, FieldProps } from "formik";

interface TextInputProps {
    id: string;
    name: string;
    type: "text" | "password" | "number" | "date" | "email";
    label: string;
    groupCustomClass?: string;
    inputCustomClass?: string;
    placeholder?: string;
    error?: string | null;
    disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = (props) => {
    const { id, name, type, label, groupCustomClass, inputCustomClass, placeholder, error, disabled } = props;

    const inputClass = error
        ? "bg-red-50 !border-2 !border-red-500 text-red-900 text-sm rounded-md block w-full p-2.5 shadow-md"
        : "bg-gray-50 !border-2 !border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 shadow-md hover:!border-blue-500 bg-quaternary text-primary";

    const labelClass = error
        ? "block mb-1 text-sm font-medium text-red-500"
        : "block mb-1 text-sm font-medium text-primary";

    return (
        <div className={`mb-4 ${groupCustomClass || ""}`}>
            <label htmlFor={id} className={labelClass}>
                {label}
            </label>
            <Field name={name}>
                {({ field }: FieldProps) => (
                    <input
                        id={id}
                        type={type}
                        placeholder={placeholder || ""}
                        className={`${inputClass} ${inputCustomClass || ""}`}
                        disabled={disabled}
                        {...field} // Spread Formik's field props
                    />
                )}
            </Field>
            {error && <p className="mt-2 text-red-500 font-semibold text-sm">{error}</p>}
        </div>
    );
};

export default TextInput;
