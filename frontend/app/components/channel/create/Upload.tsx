import { useState } from "react";
import Button from "@/app/components/misc/Button";
import { ButtonType, ButtonStyle } from "@/enums/ButtonEnum";
import FileDropInput from "@/app/components/forms/FileDropInput";


interface UploadProps {
    handleNextClick: () => void;
    saveFormData: (data: FormData) => void;
}

const Upload: React.FC<UploadProps> = (props) => {
    const [isNextEnabled, setIsNextEnabled] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData | null>(null);

    const onFileChanged = (fileList: File[], videoLength: number, fileValid: boolean) => {
        const newFormData = new FormData();
        newFormData.append('short', fileList[0]);
        newFormData.append('videoLength', videoLength.toString());
        
        setFormData(newFormData);
        setIsNextEnabled(fileValid);
    };

    const handleNextClick = () => {
        if(!formData) {
            return;
        }

        props.saveFormData(formData);
        props.handleNextClick();
    }

    return (
        <>
            <div className="flex flex-col items-center mt-6 w-full pl-4 pr-4">
                <FileDropInput 
                    id="file" 
                    name="file" 
                    label="Short uploaden" 
                    acceptedFiles=".mp4,.mkv,.mov,.avi,.flv,.ts,.ps,.mxf,.lxf,.gxf,.3gp,.webm,.mpg,.qt" 
                    onChange={onFileChanged}
                />
            </div>

            <div className="w-full flex mt-4 p-2 pr-2 justify-end">
                <Button 
                    id="next" 
                    type={ButtonType.Button} 
                    style={ButtonStyle.Primary} 
                    value="Verder" 
                    disabled={!isNextEnabled} 
                    onClick={handleNextClick}
                />
            </div>
        </>
    );
}

export default Upload;
