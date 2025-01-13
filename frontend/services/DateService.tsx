// Convert the date format to a readable format
export function convertDateFormatToLongNL(date: string) {
    if(date === null) return "";
    
    return new Date(date).toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function convertDateFormatToShortNL(date: string) {
    if(date === null) return "";
    
    return new Date(date).toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
}