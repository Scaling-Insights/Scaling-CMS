import React from "react";
import { Field, FieldProps } from "formik";


interface TextareaInputProps {
    id: string;
    name: string;
    label: string;
    rows?: number;
    groupCustomClass?: string;
    inputCustomClass?: string;
    error?: string | null;
    disabled?: boolean;
}

const TextareaInput: React.FC<TextareaInputProps> = (props) => {
    const { id, name, label, rows, groupCustomClass, inputCustomClass, error, disabled } = props;

    const textareaClass = error
        ? "!border-2 !border-red-500 text-red-900 text-sm rounded-md block w-full p-2.5 shadow-md"
        : "!border-2 !border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 shadow-md hover:!border-blue-500 bg-quaternary text-primary";

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
                    <textarea
                        id={id}
                        rows={rows || 3}
                        className={`${textareaClass} ${inputCustomClass || ""}`}
                        disabled={disabled}
                        {...field} // Spread Formik's field props
                    />
                )}
            </Field>

            {error && <p className="mt-2 text-red-500 font-semibold text-sm">{error}</p>}
        </div>
    );
};

export default TextareaInput;
