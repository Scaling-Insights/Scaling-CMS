import React from "react";

interface TagProps{
    name: string
}

const Tag: React.FC<TagProps> = (props) => {
    return(
        <div className="flex align-middle justify-center px-2 py-1 text-sm font-medium text-white bg-primary rounded cursor-default">
            <p>{props.name}</p>
        </div>
    );
}

export default Tag;
