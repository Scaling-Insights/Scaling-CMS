export interface ICreateContentForm {
    publicationStatus: boolean;
    tags: string[];
    title: string;
    description: string;
    thumbnail?: File | null;
}