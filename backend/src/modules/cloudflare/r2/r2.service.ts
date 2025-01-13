import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, GetObjectCommand, PutObjectCommand,} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as path from 'path';
import { DirectUploadLinkDto } from '../stream/dto/DirectUploadLink.dto';

// Define types for the function parameters and return value
type GeneratePresignedUrlParams = {
  bucket: string;
  key: string;
};

@Injectable()
export class R2Service {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      endpoint: configService.get<string>('R2_ENDPOINT')!,
      credentials: {
        accessKeyId: configService.get<string>('R2_ACCESS_KEY_ID')!,
        secretAccessKey: configService.get<string>('R2_SECRET_ACCESS_KEY')!,
      },
      region: configService.get<string>('R2_REGION'),
    });
  }

  // Function to convert filename with path and add optional suffix like '-sm' or '-md'
  convertFilenameWithSuffix(filepath: string, suffix: string): string {
    const dir = path.dirname(filepath); // Get the directory part of the path (e.g., folderx/foldery)
    const ext = path.extname(filepath); // Get the file extension (e.g., .webp)
    const name = path.basename(filepath, ext); // Get the file name without extension (e.g., bla)

    // Return the full path with the provided suffix added to the filename
    return path.join(dir, `${name}-${suffix}${ext}`);
  }

  async generatePresignedUploadUrl(bucketName: string, objectKey: string, expiresInSeconds: number, contentSize: number, fileType: string): Promise<DirectUploadLinkDto> {
    try {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
            ContentLength: contentSize,
            ContentType: fileType,
        });
        const presignedUrl = await getSignedUrl(this.s3, command, { expiresIn: expiresInSeconds });
        const uid = objectKey;
        const uploadURL = presignedUrl;
        console.log("Generated pre-signed URL for upload");
        return { uid, uploadURL }
    } catch (error) {
        console.error('Error generating pre-signed URL:', error);
        throw new Error('Failed to generate pre-signed URL');
    }
  }

  async generatePresignedDownloadUrl(bucketName: string, uid: string, expiresInSeconds: number): Promise<string> {
    if (uid == null || uid == "" || uid == undefined) {
        return ""
    }

    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: uid,
        });
        console.log("Generating pre-signed download URL for:", uid);
        return await getSignedUrl(this.s3, command, { expiresIn: expiresInSeconds });
    } catch (error) {
        console.error('Error generating pre-signed download URL:', error);
        throw new Error('Failed to generate pre-signed download URL');
    }
  }

  async upload(bucket: string, key: string, text: string) {
    try {
        const params = {
            Bucket: bucket,
            Key: key, // The key (file name) for the object in R2
            Body: text,
            ContentType: "application/json", // Set the content type to JSON
        };

        // Create and send the PutObjectCommand
        const command = new PutObjectCommand(params);
        const response = await this.s3.send(command);
        console.log("Successfully uploaded JSON to R2:", response);
    } catch (error) {
        console.error("Error uploading JSON to R2:", error);
    }
  }
}
