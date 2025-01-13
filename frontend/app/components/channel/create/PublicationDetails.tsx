import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Button from "@/app/components/misc/Button";
import TagInput from "@/app/components/forms/TagInput";
import ToggleInput from "@/app/components/forms/ToggleInput";
import { ButtonType, ButtonStyle } from "@/enums/ButtonEnum";
import { ICreateContentForm } from "@/interfaces/ICreateContentForm";


interface PublicationDetailsProps {
    handlePreviousClick: () => void;
    handleNextClick: () => void;
    saveFormData: (data: FormData) => void;
    formData?: FormData;
}

const PublicationDetails: React.FC<PublicationDetailsProps> = (props) => {
    // Parse the tags from the FormData to a string array
    let tags: string[] = [];
    try {
        tags = JSON.parse(props.formData?.get("tags") as string) || [];
    } catch (error) {
        console.error("Error parsing tags:", error);
    }

    const initialValues: ICreateContentForm = {
        title: "",
        description: "",
        publicationStatus: props.formData?.get("publicationStatus") === "true" ? true : false,
        tags: tags,
    };

    const validationSchema = Yup.object({
        publicationStatus: Yup.boolean(),
        tags: Yup.array().of(Yup.string()).max(4, "Maximaal vier tags toegestaan."),
    });

    const handleFormSubmit = (values: ICreateContentForm) => {
        let formData = new FormData();
        formData.append("publicationStatus", values.publicationStatus.toString());
        formData.append("tags", JSON.stringify(values.tags));

        props.saveFormData(formData);
        props.handleNextClick();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleFormSubmit(values)}
        >
            {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
                <Form className="flex flex-col items-center mt-6 w-full pl-4 pr-4">
                    {/* Publication status slider */}
                    <div className="w-full">
                        <ToggleInput
                            id="publicationStatus"
                            name="publicationStatus"
                            label="Publicatie status *"
                            helperText="On: Openbaar, Off: Privé"
                        />
                    </div>

                    {/* Tags input */}
                    <div className="w-full">
                        <TagInput
                            id="tags"
                            name="tags"
                            label="Tags"
                            helperText="Maximaal vier tags"
                            error={touched.tags && typeof errors.tags === 'string' ? errors.tags : null}
                            tags={tags}
                        />
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
                            value="Verder"
                            disabled={!isValid}
                            onClick={() => handleFormSubmit(values)}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default PublicationDetails;
