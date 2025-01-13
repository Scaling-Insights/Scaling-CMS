import Icon from "@/app/components/misc/Icon";
import { Boxicons } from "@/enums/BoxIconsEnum";
import React, { useRef, useState, useEffect } from "react";


interface ShortPreviewProps {
    src: string;
    isUploaded: boolean;
    className?: string;
    label?: string;
}

const ShortPreview: React.FC<ShortPreviewProps> = (props) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(9 / 16); // Default to 9:16

    useEffect(() => {
        if (videoRef.current) {
            const handleLoadedMetadata = () => {
                const video = videoRef.current!;
                const ratio = video.videoHeight / video.videoWidth;
                setAspectRatio(ratio || 9 / 16); // Update aspect ratio or fallback to 9:16
            };

            videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
            return () => {
                videoRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
            };
        }
    }, [props.src]);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <label htmlFor="short" className="block mb-1 text-sm font-medium text-primary">
                {props.label}
            </label>

            <div
                className={`relative w-full h-0 pb-[56.25%] bg-gray-800 rounded-md shadow-md overflow-hidden cursor-pointer ${props.className || ""}`}
                style={{
                    paddingBottom: `${(aspectRatio * 100).toFixed(2)}%`, // Dynamic aspect ratio padding
                }}
                onClick={handlePlayPause}
            >
                {!props.isUploaded ? (
                    <video
                        ref={videoRef}
                        className="absolute top-0 left-0 w-full h-full"
                        controls={false} // Hide default controls for custom behavior
                    >
                        <source src={props.src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="absolute top-0 left-0 w-full h-full bg-black text-white flex items-center justify-center">
                        <p>Cloudflare Stream Placeholder</p>
                    </div>
                )}
                <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${isPlaying ? "hidden" : "flex" }`}>
                    <button
                        className="bg-primary text-white px-3 py-1 rounded-md flex items-center justify-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPause();
                        }}
                    >
                        {!isPlaying && <Icon name={Boxicons.Pause} customClass="text-4xl" />}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ShortPreview;
