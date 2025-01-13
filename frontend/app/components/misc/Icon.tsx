import React from "react";
import { IconName } from "boxicons";


interface IconProps {
    name: IconName;
    color?: string;
    customClass?: string;
}

const Icon: React.FC<IconProps> = (props) => {
    return <i className={`bx ${props.name} ${props.color ? props.color : ""} ${props.customClass} group-hover:text-inherit z-10 text-3xl`}/>;
};

export default Icon;