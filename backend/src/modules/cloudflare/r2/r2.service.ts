import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
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

  // Mock function to generate a presigned upload URL
  async generatePresignedUploadUrl(
    bucketName: string,
    objectKey: string,
    expiresInSeconds: number,
    contentSize: number,
    fileType: string,
  ): Promise<DirectUploadLinkDto> {
    try {
      // Mock presigned URL
      const presignedUrl = `https://mock-presigned-url.com/${bucketName}/${objectKey}`;
      const uid = objectKey;
      const uploadURL = presignedUrl;
      return { uid, uploadURL };
    } catch (error) {
      throw new Error('Failed to generate mock pre-signed URL');
    }
  }

  // Mock function to generate a presigned download URL
  async generatePresignedDownloadUrl(
    bucketName: string,
    uid: string,
    expiresInSeconds: number,
  ): Promise<string> {
    try {
      // Mock presigned URL
      const presignedUrl = `https://mock-presigned-url.com/${bucketName}/${uid}`;
      return presignedUrl;
    } catch (error) {
      throw new Error('Failed to generate mock pre-signed download URL');
    }
  }

  // Mock function to simulate upload
  async upload(bucket: string, key: string, text: string) {
    try {
      //console.log(`Mock upload to bucket: ${bucket}, key: ${key}, text: ${text}`,);
      // Simulate successful upload
      const response = { status: 'success', message: 'Mock upload successful' };
      //console.log('Successfully uploaded JSON to R2:', response);
    } catch (error) {
      console.error('Error uploading JSON to R2:', error);
    }
  }
}
