import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Button from "@/app/components/misc/Button";
import TextInput from "@/app/components/forms/TextInput";
import FileInput from "@/app/components/forms/FileInput";
import { ButtonType, ButtonStyle } from "@/enums/ButtonEnum";
import TextareaInput from "@/app/components/forms/TextareaInput";
import { ICreateContentForm } from "@/interfaces/ICreateContentForm";


interface DetailsProps {
    handlePreviousClick: () => void;
    handleNextClick: () => void;
    saveFormData: (data: FormData) => void;
    formData?: FormData;
}

const ContentDetails: React.FC<DetailsProps> = (props) => {
    const initialValues: ICreateContentForm = {
        title: props.formData?.get("title") as string || "",
        description: props.formData?.get("description") as string || "",
        thumbnail: null,
        tags: [],
        publicationStatus: false
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required("Titel is verplicht.")
            .max(100, "Titel mag maximaal 100 karakters bevatten.")
            .matches(/^\S/, "Titel mag niet beginnen met een spatie.")
            .matches(/^\S.*$/, "Titel mag niet alleen uit spaties bestaan."),
        description: Yup.string()
            .max(2200, "Beschrijving mag maximaal 2200 karakters bevatten."),
    });

    const handleFormSubmit = (values: ICreateContentForm) => {
        let formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);

        if (values.thumbnail) {
            formData.append("thumbnail", values.thumbnail);
            formData.append("thumbnailSize", values.thumbnail.size.toString());
            formData.append("thumbnailType", values.thumbnail.type);
        }

        props.saveFormData(formData);
        props.handleNextClick();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleFormSubmit(values)}
            validateOnMount={true}
        >
            {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
                <Form className="flex flex-col items-center mt-6 w-full pl-4 pr-4">
                    <div className="w-full">
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            label="Titel *"
                            error={touched.title && errors.title ? errors.title : null}
                        />
                    </div>

                    <div className="w-full md:mt-4">
                        <TextareaInput
                            id="description"
                            name="description"
                            label="Beschrijving"
                            error={touched.description && errors.description ? errors.description : null}
                        />
                    </div>

                    <div className="w-full md:mt-4">
                        <FileInput
                            id="thumbnail"
                            name="thumbnail"
                            label="Thumbnail"
                            acceptedFiles=".jpg,.jpeg,.png,.webp"
                            onChange={(file) => setFieldValue("thumbnail", file)}
                            error={touched.thumbnail && errors.thumbnail ? errors.thumbnail : null}
                        />
                    </div>

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
};

export default ContentDetails;
