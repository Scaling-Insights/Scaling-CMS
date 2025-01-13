import React, { useState } from "react";


interface FileDropInputProps {
    id: string;
    name: string;
    label: string;
    customClass?: string;
    acceptedFiles: string;
    error?: string | null;
    onChange: (fileList: File[], videoLength: number, fileValid: boolean) => void;
}

const FileDropInput: React.FC<FileDropInputProps> = (props) => {
    const [fileSelected, setFileSelected] = useState<File | null>(null);
    const [fileSizeMB, setFileSizeMB] = useState<number | null>(null);
    const [videoDuration, setVideoDuration] = useState<number | null>(null);
    const [errorState, setErrorState] = useState<string | null>(props.error || null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        setErrorState(null);
        setFileSelected(null);
        setFileSizeMB(null);
        setVideoDuration(null);

        if (file) {
            let acceptedFileTypes = props.acceptedFiles.split(",").map((type) => type.replace(".", "video/"));


            // Validate file type
            if (acceptedFileTypes.includes(file.type) || file.type === "video/quicktime" || file.type === "video/x-matroska") {
                processVideo(file);
            } else {
                setErrorState(`Ongeldige bestandstype. Alleen ${props.acceptedFiles} zijn toegestaan.`);
                //console.log("Invalid file type:", file.type);
                props.onChange([], 0, false);
            }
        } else {
            props.onChange([], 0, false);
        }
    };

    const processVideo = (file: File) => {
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);

            const maxDuration = Number(process.env.NEXT_PUBLIC_SHORT_MAX_LENGTH);
            let isValidDuration = video.duration <= maxDuration;

            if (!isValidDuration) {
                setErrorState(`Short mag niet langer zijn dan ${maxDuration} seconden.`);
                resetFileState();
                props.onChange([], 0, false);
            } else {
                // Pass valid video file to Formik
                setFileState(file, video.duration);
                props.onChange([file], video.duration, true);
            }
        };

        video.onerror = () => {
            setErrorState("Ongeldige video. Kan metadata niet laden.");
            resetFileState();
            props.onChange([], 0, false);
        };

        video.src = URL.createObjectURL(file);
    };

    const resetFileState = () => {
        setFileSelected(null);
        setFileSizeMB(null);
        setVideoDuration(null);
    };

    const setFileState = (file: File, duration: number) => {
        setFileSelected(file);
        setFileSizeMB(file.size / (1024 * 1024));
        setVideoDuration(Math.round(duration));
        setErrorState(null);
    };

    return (
        <div className={`mb-4 w-full ${props.customClass || ""}`}>
            <label htmlFor={props.id} className="block mb-2 text-sm font-medium text-primary">
                {props.label}
            </label>

            <div className="bg-quaternary shadow-md mb-2 !border-2 !border-gray-300 rounded-md cursor-pointer">
                <input
                    id={props.id}
                    name={props.name}
                    type="file"
                    accept={props.acceptedFiles}
                    className="w-full text-sm text-primary hidden"
                    onChange={handleFileChange}
                />
                <label htmlFor={props.id} className="block text-center py-10 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer p-2.5 ">
                    <svg
                        className="w-12 h-12 mb-4 text-primary m-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <span>Sleep en zet bestanden hier neer of klik om te uploaden</span>
                    <p className="text-xs text-primary break-words">Alleen {props.acceptedFiles} kunnen worden geüpload.</p>
                </label>
            </div>

            {errorState && <p className="mt-2 text-red-500 font-bold">{errorState}</p>}
            {!fileSelected && !errorState && <p className="mt-2 text-gray-500">Geen bestand geselecteerd</p>}
            {fileSelected && !errorState && (
                <div className="italic mt-2">
                    <p>Bestandsnaam: {fileSelected.name}</p>
                    <p>Bestandsgrootte: {fileSizeMB?.toFixed(2)} MB</p>
                    {videoDuration !== null && <p>Video duur: {videoDuration} seconden</p>}
                </div>
            )}
        </div>
    );
};

export default FileDropInput;
