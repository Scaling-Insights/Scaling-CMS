import React from "react";
import { FormikErrors } from "formik";


interface FileInputProps {
    id: string;
    name: string;
    label: string;
    groupCustomClass?: string;
    acceptedFiles: string;
    onChange: (file: File | null) => void;
    error?: string | string[] | FormikErrors<any> | FormikErrors<any>[]; // Display validation errors
}

const FileInput: React.FC<FileInputProps> = (props) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        props.onChange(file || null);
    };

    return (
        <div className={`mb-4 ${props.groupCustomClass}`}>
            <label htmlFor={props.id} className="block mb-2 text-sm paragraph">
                {props.label}
            </label>
            <input
                id={props.id}
                name={props.name}
                type="file"
                accept={props.acceptedFiles}
                className={`block cursor-pointer w-full text-sm text-primary file:cursor-pointer rounded-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:text-white ${
                    props.error ? "border-red-500" : ""
                }`}
                onChange={handleFileChange}
            />
            <p className="mt-1 text-sm text-gray-500">{props.acceptedFiles}</p>
            {props.error && <div className="text-red-500 text-sm mt-1">{Array.isArray(props.error) ? props.error.join(', ') : props.error.toString()}</div>} {/* Show error if any */}
        </div>
    );
};

export default FileInput;
