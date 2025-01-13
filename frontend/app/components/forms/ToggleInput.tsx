import React from "react";
import { Field, FieldProps } from "formik";

interface ToggleInputProps {
    id: string;
    name: string;
    label: string;
    customClass?: string;
    error?: string | null;
    helperText?: string;
    disabled?: boolean;
}

const ToggleInput: React.FC<ToggleInputProps> = (props) => {
    const { id, name, label, customClass = "", error, helperText, disabled } = props;

    return (
        <div className={`mb-4 ${customClass}`}>
            <Field name={name}>
                {({ field }: FieldProps) => (
                    <label id={id} className="block text-sm font-medium text-primary">
                        <span className="text-sm text-primary">{label}</span>
                        <input
                            type="checkbox"
                            name={name}
                            className="sr-only peer"
                            checked={field.value}
                            onChange={(e) => field.onChange(e)}
                            disabled={disabled}
                        />
                        <div className={`relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${disabled ? 'peer-checked:bg-gray-500' : 'peer-checked:bg-green-500'}`}></div>
                        <span className="italic text-sm">({helperText})</span>
                    </label>
                )}
            </Field>
            {error && <p className="mt-2 text-red-500 font-semibold text-sm">{error}</p>}
        </div>
    );
};

export default ToggleInput;
