"use client";
import React, { useEffect, useState } from "react";
import Icon from "@/app/components/misc/Icon";


const ThemeToggle: React.FC = () => {
    let [darkModeEnabled, setDarkModeEnabled] = useState(null) 

    useEffect(() => {
        if(darkModeEnabled === null){
            setDarkModeEnabled(localStorage.getItem("Theme") == "true");
        }
        localStorage.setItem("Theme", `${darkModeEnabled}`)

        document.body.classList.remove("dark")
        if(darkModeEnabled){
            document.body.classList.add("dark")
        }
    }, [darkModeEnabled]);

    return(
        <>
            <button title="ThemeToggle" onClick={() => setDarkModeEnabled(!darkModeEnabled)}>
                <Icon name={darkModeEnabled ? "bx-sun" : "bx-moon"} color="text-primary"></Icon>
            </button>
        </>
    );
};

export default ThemeToggle;