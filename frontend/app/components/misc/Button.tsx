import React, { MouseEventHandler } from 'react';
import { ButtonType, ButtonStyle } from "@/enums/ButtonEnum";

interface ButtonProps {
    type: ButtonType;
    id: string;
    value: string;
    onClick?: () => void;
    submitAction?: MouseEventHandler<HTMLButtonElement>;
    customClass?: string | "";
    style?: ButtonStyle;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    let buttonClass = "mb-3 md:focus:ring-2 md:focus:outline-none md:focus:ring-blue-300 font-medium rounded-full text-sm w-fit px-5 py-2 text-center border-2 ";

    if (props.disabled) {
        buttonClass += `text-white bg-gray-400 !border-gray-400 cursor-not-allowed ${props.customClass}`;
    } else {
        switch(props.style) {
            case ButtonStyle.Primary:
                buttonClass += `border-primary text-white button-submit ${props.customClass}`;
                break;
            case ButtonStyle.Secondary:
                buttonClass += `border-primary text-primary background-white button-secondary ${props.customClass}`;
                break;
            case ButtonStyle.Cancel:
                buttonClass += `border-primary text-white bg-red-700 !border-red-700 ${props.customClass}`;
                break;
            default:
                break;
        }
    }

    return (
        <button type={props.type} id={props.id} onClick={props.submitAction || props.onClick} className={buttonClass} disabled={props.disabled}>{props.value}</button>
    );
}

export default Button;
