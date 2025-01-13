import { DirectUploadLinkDto } from "src/modules/cloudflare/stream/dto/DirectUploadLink.dto";

export interface IR2Service {
    convertFilenameWithSuffix(filepath: string, suffix: string): string;
    generatePresignedUploadUrl(bucketName: string, objectKey: string, expiresInSeconds: number, contentSize: number, fileType: string): Promise<DirectUploadLinkDto>;
    generatePresignedDownloadUrl(bucketName: string, uid: string, expiresInSeconds: number): Promise<string>;
    upload(bucket: string, key: string, text: string);
}