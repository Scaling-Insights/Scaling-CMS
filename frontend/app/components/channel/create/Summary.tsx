import React from "react";
import Image from "next/image";
import { Formik, Form } from "formik";
import Button from "@/app/components/misc/Button";
import TagInput from "@/app/components/forms/TagInput";
import TextInput from "@/app/components/forms/TextInput";
import { ButtonType, ButtonStyle } from "@/enums/ButtonEnum";
import ShortPreview from "@/app/components/short/ShortPreview";
import TextareaInput from "@/app/components/forms/TextareaInput";


interface SummaryProps {
    handlePreviousClick: () => void;
    formData?: FormData;
    handleFormSubmit: () => void;
}

const Summary: React.FC<SummaryProps> = (props) => {
    const title = props.formData?.get("title") as string || "";

    const initialValues = {
        title: title,
        description: props.formData?.get("description") as string || "",
        thumbnail: props.formData?.get("thumbnail") as File || null,
        publicationStatus: props.formData?.get("publicationStatus") === "true" ? true : false,
        short: props.formData?.get("short") as File || null,
    };

    let tags: string[] = [];
    try {
        tags = JSON.parse(props.formData?.get("tags") as string) || [];
    } catch (error) {
        console.error("Error parsing tags:", error);
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={() => props.handleFormSubmit()}
        >
            {({ values }) => (
                <Form className="flex flex-col items-center mt-6 w-full pl-4 pr-4">
                    <div className="grid grid-cols-12 md:gap-4 w-full">
                        {/* Left side */}
                        <div className="col-span-12 md:col-span-7">
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                label="Titel *"
                                disabled={true}
                            />

                            {/* Description Input */}
                            <div className="w-full mt-2">
                                <TextareaInput
                                    id="description"
                                    name="description"
                                    label="Beschrijving"
                                    disabled={true}
                                />
                            </div>

                            {/* Tags Input */}
                            <div className="w-full mt-2">
                                <TagInput
                                    id="tags"
                                    name="tags"
                                    label="Tags"
                                    disabled={true}
                                    tags={tags}
                                />
                            </div>

                            {/* Thumbnail Input */}
                            <div className="w-full">
                                <>
                                    <label htmlFor="thumbnail" className="block mb-1 text-sm font-medium text-primary">
                                        Thumbnail
                                    </label>
                                    {(values.thumbnail && values.thumbnail instanceof File) ? (
                                        <Image id="thumbnail" alt={title} src={URL.createObjectURL(values.thumbnail)} width={200} height={200} className="rounded-md shadow-md" />
                                    ) : (
                                        <Image id="thumbnail" alt={title} src="/images/placeholder.webp" width={200} height={200} className="rounded-md shadow-md" />
                                    )}
                                </>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="col-span-12 md:col-span-5">
                            <div className="w-full mt-4 md:mt-0">
                                <ShortPreview
                                    src={URL.createObjectURL(values.short)}
                                    isUploaded={false}
                                    label="Short preview"
                                />
                            </div>

                            <div className="w-full mt-2">
                                <label htmlFor="publicationStatus" className="block mb-1 text-sm font-medium text-primary">
                                    Publicatie status
                                </label>
                                {
                                    props.formData?.get("publicationStatus") === "true" ? <span className="text-sm italic">Openbaar</span> : <span className="text-sm italic">Privé</span>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Footer buttons */}
                    <div className="w-full flex mt-4 pb-2 justify-between">
                        <Button
                            id="back"
                            type={ButtonType.Button}
                            style={ButtonStyle.Secondary}
                            value="Terug"
                            onClick={props.handlePreviousClick}
                        />
                        <Button
                            id="next"
                            type={ButtonType.Button}
                            style={ButtonStyle.Primary}
                            value="Opslaan"
                            onClick={() => props.handleFormSubmit()}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Summary;
