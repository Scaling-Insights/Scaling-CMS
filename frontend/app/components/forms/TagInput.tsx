import React, { useState, useEffect } from "react";
import { Field, FieldProps } from "formik";

interface TagInputProps {
    id: string;
    name: string;
    label: string;
    groupCustomClass?: string;
    placeholder?: string;
    helperText?: string;
    error?: string | null;
    disabled?: boolean;
    tags?: string[];
}

const TagInput: React.FC<TagInputProps> = (props) => {
    let { id, name, label, groupCustomClass, placeholder = "Voeg een tag toe", helperText, disabled, tags: initialTags = [] } = props;
    const [error, setError] = useState<string | null>(props.error);

    return (
        <div className={`mb-4 ${groupCustomClass || ""}`}>
            <label htmlFor={id} className="block mb-1 text-sm font-medium text-primary">
                {label}
            </label>
            <Field name={name}>
                {({ field, form }: FieldProps) => {
                    const [inputValue, setInputValue] = useState("");
                    const [tags, setTags] = useState<string[]>(field.value && field.value.length > 0 ? field.value : initialTags);

                    const addTag = () => {
                        setError(null);

                        if (inputValue.trim() && !tags.includes(inputValue.trim())) {
                            const newTags = [...tags, inputValue.trim()];

                            if (newTags.length > Number(process.env.NEXT_PUBLIC_MAX_TAGS)) {
                                setError("Maximaal aantal tags bereikt");
                                return;
                            }

                            if (inputValue.trim().length > Number(process.env.NEXT_PUBLIC_TAG_MAX_LENGTH)) {
                                setError("Maximaal aantal karakters per tag bereikt (" + process.env.NEXT_PUBLIC_TAG_MAX_LENGTH + ")");
                                return;
                            }

                            setTags(newTags);
                            form.setFieldValue(name, newTags);
                            setInputValue("");
                        }
                    };

                    const removeTag = (index: number) => {
                        setError(null);

                        const newTags = tags.filter((_: string, i: number) => i !== index);
                        setTags(newTags);
                        form.setFieldValue(name, newTags);
                    };

                    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (["Enter", " "].includes(e.key)) {
                            e.preventDefault();
                            addTag();
                        }
                    };

                    return (
                        <div className="flex flex-wrap items-center gap-2 bg-secondary border-2 border-gray-300 rounded-md p-2 min-h-10 shadow-md">
                            {tags.map((tag: string, index: number) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-primary rounded cursor-default">
                                    {tag}

                                    {!disabled && (
                                        <button type="button" onClick={() => removeTag(index)} className="ml-1 text-lg text-white bg-transparent hover:text-red-300 focus:outline-none">
                                            x
                                        </button>
                                    )}
                                </span>
                            ))}
                            
                            {!disabled && tags.length < Number(process.env.NEXT_PUBLIC_MAX_TAGS) && (
                                <input
                                    id={id}
                                    type="text"
                                    placeholder={placeholder}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-grow bg-transparent border-none outline-none text-sm text-primary rounded-md"
                                    disabled={disabled}
                                />
                            )}
                        </div>
                    );
                }}
            </Field>
            {helperText && <span className="italic text-sm">({helperText})</span>}
            {error && <p className="mt-2 text-red-500 font-semibold text-sm">{error}</p>}
        </div>
    );
};

export default TagInput;
