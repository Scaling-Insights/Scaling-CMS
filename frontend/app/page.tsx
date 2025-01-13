"use client";
import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { usePost } from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import Button from "@/app/components/misc/Button";
import TextInput from "@/app/components/forms/TextInput";
import { ButtonStyle, ButtonType } from "@/enums/ButtonEnum";


interface FormData {
    email: string;
    password: string;
}

export default function Home() {
    const initialValues: FormData = {
        email: "",
        password: "",
    };

    const router = useRouter();
    const { postData } = usePost();

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Email is verplicht."),
        password: Yup.string()
            .required("Wachtwoord is verplicht."),
    });

    const handleSubmit = async (formData: FormData) => {
        if (formData.email != '' && formData.password != '') {
            const { response, data } = await postData('/auth/login', formData, false);
            if (response == 200) router.push("/channel")
            else { alert("Er is een fout opgetreden, probeer het opnieuw") }
        }
        else {
            alert("Invoervelden zijn leeg");
        }
    };

    return (
        <div className="flex justify-center content-center items-center h-screen">
            <div className="flex flex-col items-center justify-center rounded-md h-3/5 w-full sm:w-full lg:w-10/12 xl:w-8/12 bg-secondary shadow-md">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold">Vul uw gegevens in om in te loggen</h1>
                </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(event) => handleSubmit(event)}>
                    {({ errors, touched }) => (
                        <Form className="flex flex-col items-center mt-8 w-full pl-4 pr-4">
                            <div className="w-full max-w-96">
                                <TextInput
                                    id="email"
                                    type="text"
                                    name="email"
                                    label="Email *"
                                    error={touched.email && errors.email ? errors.email : null}
                                />
                            </div>
                            <div className="w-full max-w-96">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    label="Wachtwoord *"
                                    error={touched.password && errors.password ? errors.password : null}
                                />
                            </div>
                            <div className="w-full flex justify-center">
                                <Button
                                    id="loginButton"
                                    type={ButtonType.Submit}
                                    value="Inloggen"
                                    style={ButtonStyle.Primary}
                                    customClass="w-full max-w-96"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
