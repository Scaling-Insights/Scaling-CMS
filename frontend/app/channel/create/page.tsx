"use client";
import { useState } from "react";
import { usePut } from "@/hooks/usePut";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import { ContentType } from "@/enums/ContentType";
import Button from "@/app/components/misc/Button";
import Spinner from "@/app/components/misc/Spinner";
import Header from "@/app/components/header/Header";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Upload from "@/app/components/channel/create/Upload";
import { ButtonType, ButtonStyle } from "@/enums/ButtonEnum";
import Summary from "@/app/components/channel/create/Summary";
import { PublicationStatus } from "@/enums/PublicationStatus";
import ContentDetails from "@/app/components/channel/create/ContentDetails";
import PublicationDetails from "@/app/components/channel/create/PublicationDetails";

// const content = [
//     { title: "titel die best wel lang is maar dat is oke want hij kapt hem mooi af", description: "beschrijving", tags: ["tag1", "tag2", "tag3"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "https://images.unsplash.com/photo-1516690553959-71a414d6b9b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { title: "titel", description: "beschrijving kan echt heel lang worden dit is natuurlijk super cool maar ik heb helemaal geen zn om zo veeeeeeeeeel te typen, dat is toch een drama.", tags: ["tag1"], createdAt: new Date(Date.now()), publicationStatus: "private", thumbnailLink: "https://images.unsplash.com/photo-1506792006437-256b665541e2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { title: "titel", description: "", tags: ["tag1", "tag2"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "" },
//     { title: "", description: "beschrijving", tags: [], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "" },
//     { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.now()), publicationStatus: "public", thumbnailLink: "" },
//     { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.now()), publicationStatus: "public", thumbnailLink: "" },
//     { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "" },
//     { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.now()), publicationStatus: "public", thumbnailLink: "" },
// ];

export default function Create() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorState, setErrorState] = useState<string | null>(null);

    const [stage, setStage] = useState<number>(1);
    const [formData, setFormData] = useState<FormData | null>(null);

    const { getData } = useGet();
    const { putData } = usePut();
    const { postData } = usePost();

    const handleNextClick = () => {
        setErrorState(null);
        setStage(stage + 1);
    }
    const handlePrevClick = () => {
        setErrorState(null);
        setStage(stage - 1);
    }

    // Save the form data from each stage to the state
    const saveFormData = (newFormData: FormData) => {
        setFormData((prevFormData) => {
            // If there is existing FormData, merge the new keys/values
            const updatedFormData = prevFormData ? prevFormData : new FormData();
            newFormData.forEach((value, key) => {
                updatedFormData.set(key, value);
            });

            return updatedFormData;
        });
    };

    // Handle the upload to Cloudflare Stream
    const handleStreamUpload = async () => {
        try {
            const { response: requestStreamResponse, data: requestStreamData } = await getData(process.env.NEXT_PUBLIC_REQUEST_STREAM_UPLOAD_URL)
            if (requestStreamResponse !== 200 || !requestStreamData || !requestStreamData['data']['streamUploadUrl']) {
                console.error("requestStreamResponse", requestStreamResponse);
                console.error("requestStreamData", requestStreamData);
                throw new Error("Er is iets misgegaan bij het ophalen van de Stream upload URL. Probeer het opnieuw.");
            }

            const streamFormData = new FormData();
            streamFormData.append("file", formData?.get("short") as File);
            const { response: streamResponse, data: streamData } = await postData(requestStreamData['data']['streamUploadUrl'], streamFormData, true);
            if (streamResponse !== 200) {
                console.error("streamResponse", streamResponse);
                console.error("streamData", streamData);
                throw new Error("Er is iets misgegaan bij het uploaden van de video. Probeer het opnieuw.");
            }

            return requestStreamData;
        } catch (error) {
            setErrorState(error.message);
            setIsLoading(false);
            console.error("handleStreamUpload error:", error);
            return null;
        }
    }

    // Handle the upload to Cloudflare R2
    const handleR2Upload = async () => {
        try {
            const r2FormData = {
                "contentSize": formData?.get("thumbnailSize"),
                "fileType": formData?.get("thumbnailType"),
                "fileName": (formData?.get("thumbnail") as File).name,
            };

            const { response: requestR2Response, data: requestR2Data } = await postData(process.env.NEXT_PUBLIC_REQUEST_R2_UPLOAD_URL, r2FormData, false);
            if ((requestR2Response !== 201) || !requestR2Data || !requestR2Data["data"]['r2UploadUrl']) {
                console.error("requestR2Response", requestR2Response);
                console.error("requestR2Data", requestR2Data);
                throw new Error("Er is iets misgegaan bij het ophalen van de R2 upload URL. Probeer het opnieuw.");
            }

            const { response: r2Response, data: r2Data } = await putData(requestR2Data["data"]['r2UploadUrl'], formData?.get("thumbnail") as File, true);
            if (r2Response !== 200 && r2Response !== 201) {
                console.error("r2Response", r2Response);
                console.error("r2Data", r2Data);
                throw new Error("Er is iets misgegaan bij het uploaden van de thumbnail. Probeer het opnieuw.");
            }

            return requestR2Data;
        } catch (error) {
            setErrorState(error.message);
            setIsLoading(false);
            console.error("handleR2Upload error:", error);
            return null;
        }
    }

    // Handle the content API
    const handleContentSave = async (requestStreamData: any, requestR2Data: any) => {
        try {
            const tagsString = formData?.get("tags") as string;
            const tagsArray = tagsString ? JSON.parse(tagsString) : [];

            const contentDTO = {
                title: formData?.get("title") as string || "",
                description: formData?.get("description") as string || "",
                type: ContentType.SHORT,
                tags: tagsArray,
                publicationStatus: formData?.get("publicationStatus") as string == "true" ? PublicationStatus.PUBLIC : PublicationStatus.PRIVATE,
                streamUID: requestStreamData['data']['shortVideoUid'] || "",
                videoLength: parseInt(formData?.get("videoLength") as string, 10) || 0,
                thumbnailLink: requestR2Data["data"]["r2UploadUid"] != "" ? requestR2Data["data"]["r2UploadUid"] : "",
            };

            const { response: contentResponse, data: contentData } = await postData(process.env.NEXT_PUBLIC_CONTENT_UPLOAD_URL, contentDTO, false);
            if ((contentResponse != 200 && contentResponse != 201) || contentData == null) {
                throw new Error("Er is iets misgegaan bij het opslaan van de content. Probeer het opnieuw.");
            }

            return contentResponse;
        } catch (error) {
            setErrorState(error.message);
            setIsLoading(false);
            console.error("handleContentSave error:", error);
            return null;
        }
    }

    // Final end boss of the create flow
    const handleFormSubmit = async () => {
        //console.log("Submitting form data");

        setIsLoading(true);
        setErrorState(null);

        // Stream upload
        const requestStreamData = await handleStreamUpload();
        if (!requestStreamData) {
            setIsLoading(false);
            return;
        }

        // R2 upload
        let requestR2Data;
        if (formData?.get("thumbnail") != null) {
            requestR2Data = await handleR2Upload();
            if (!requestR2Data) {
                setIsLoading(false);
                return;
            }
        } else {
            requestR2Data = { data: { r2UploadUid: "" } };
        }

        // Upload content
        const contentResponse = await handleContentSave(requestStreamData, requestR2Data);
        if (contentResponse != 201) {
            setIsLoading(false);
            return;
        }

        //console.log("Done submitting form data");
        setIsLoading(false);
        router.push("/channel")

        // Pseudocode
        // Client stuurt verzoek voor presigned Stream URL naar API
        // API vraagt presigned Stream URLs & UID voor aan Cloudflare
        // Cloudflare geeft presigned URL & UID token aan API
        // API stuurt presigned URLs naar frontend
        // Frontend upload naar Stream

        // Client stuurt verzoek voor presigned R2 URL naar API
        // API vraagt presigned R2 URL voor aan Cloudflare
        // Cloudflare geeft presigned R2 URL aan API
        // API stuurt presigned R2 URL naar frontend
        // Frontend upload naar R2

        // Client stuurt data naar API  
        // API stuurt data naar database
        // API stuurt bevestiging naar frontend
    }

    return (
        <>
            <Sidebar />
            <Header />

            <div className="w-full p-4 sm:ml-64 lg:ml-32">
                <div className="flex justify-center">
                    <div className="flex flex-col items-center justify-center rounded-md h-full mt-8 sm:mt-28 w-full sm:w-12/12 lg:w-10/12 xl:w-8/12 bg-secondary shadow-md">
                        {/* Header */}
                        <div className="shadow-md w-full p-4 rounded-t-md bg-tertiary">
                            <div className="flex space-between justify-center gap-4 xl:gap-8">
                                <Button id="upload-desktop" type={ButtonType.Button} style={ButtonStyle.Primary} value="Uploaden" customClass="!mb-0 hidden lg:block" disabled={stage != 1} />
                                <Button id="upload-mobile" type={ButtonType.Button} style={ButtonStyle.Primary} value="1" customClass="!mb-0 block lg:hidden" disabled={stage != 1} />

                                <Button id="details-desktop" type={ButtonType.Button} style={ButtonStyle.Primary} value="Details" customClass="!mb-0 hidden lg:block" disabled={stage != 2} />
                                <Button id="details-mobile" type={ButtonType.Button} style={ButtonStyle.Primary} value="2" customClass="!mb-0 block lg:hidden" disabled={stage != 2} />

                                <Button id="weergave-desktop" type={ButtonType.Button} style={ButtonStyle.Primary} value="Weergave" customClass="!mb-0 hidden lg:block" disabled={stage != 3} />
                                <Button id="weergave-mobile" type={ButtonType.Button} style={ButtonStyle.Primary} value="3" customClass="!mb-0 block lg:hidden" disabled={stage != 3} />

                                <Button id="overzicht-desktop" type={ButtonType.Button} style={ButtonStyle.Primary} value="Overzicht" customClass="!mb-0 hidden lg:block" disabled={stage != 4} />
                                <Button id="overzicht-mobile" type={ButtonType.Button} style={ButtonStyle.Primary} value="4" customClass="!mb-0 block lg:hidden" disabled={stage != 4} />
                            </div>
                        </div>

                        <div className="w-full">
                            {isLoading ? (
                                <div className="min-h-64 flex flex-col justify-center items-center">
                                    <h2>Content aan het aanmaken...</h2>
                                    <Spinner className="mt-2 mb-4" />
                                </div>
                            ) : (
                                (() => {
                                    switch (stage) {
                                        case 1:
                                            return (
                                                <Upload
                                                    handleNextClick={handleNextClick}
                                                    saveFormData={saveFormData}
                                                />
                                            );
                                        case 2:
                                            return (
                                                <ContentDetails
                                                    handlePreviousClick={handlePrevClick}
                                                    handleNextClick={handleNextClick}
                                                    saveFormData={saveFormData}
                                                    formData={formData}
                                                />
                                            );
                                        case 3:
                                            return (
                                                <PublicationDetails
                                                    handlePreviousClick={handlePrevClick}
                                                    handleNextClick={handleNextClick}
                                                    saveFormData={saveFormData}
                                                    formData={formData}
                                                />
                                            );
                                        case 4:
                                            return (
                                                <>
                                                    {errorState && <p className="text-red-500 text-center mt-2">{errorState}</p>}
                                                    <Summary
                                                        handlePreviousClick={handlePrevClick}
                                                        handleFormSubmit={handleFormSubmit}
                                                        formData={formData}
                                                    />
                                                </>
                                            );
                                        default:
                                            return null;
                                    }
                                })()
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
