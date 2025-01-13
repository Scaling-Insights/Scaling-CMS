import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { DirectUploadLinkDto } from './dto/DirectUploadLink.dto';
import axios from 'axios';
import { IStreamService } from './stream.service.interface';

@Injectable()
export class StreamService implements IStreamService {
  constructor(private readonly configService: ConfigService) { }

  async createDirectUploadLink(userId: BigInt): Promise<DirectUploadLinkDto> {

    const cloudflareKey = this.configService.get<string>('CLOUDFLARE_KEY');
    const cloudflareAccountId = this.configService.get<string>('CLOUDFLARE_UID');
    const linkExpiresIn = parseInt(this.configService.get<string>('CLOUDFLARE_EXPIRES_IN').replace('s', ''), 10);

    const expiry = new Date(Date.now() + linkExpiresIn * 1000).toISOString();

    if (!cloudflareKey || !cloudflareAccountId) {
      throw new Error('Cloudflare credentials are not properly set.');
    }

    const options = {
      method: 'POST',
      url: `https://api.cloudflare.com/client/v4/accounts/${cloudflareAccountId}/stream/direct_upload`,
      headers: {
        Authorization: `Bearer ${cloudflareKey}`,
        'Content-Type': 'application/json',
      },
      data: {
        allowedOrigins: ['localhost:30080'],
        creator: userId.toString(),
        expiry: expiry,
        maxDurationSeconds: 60,
        meta: {
          userId: userId.toString(),
        },
        requireSignedURLs: false,
        scheduledDeletion: null,
        thumbnailTimestampPct: 0,
        watermark: {},
      },
    };

    try {
      const response = await axios.request(options);
      const { uid, uploadURL } = response.data.result;
      console.log('Created direct upload link uid:', uid);
      return { uid, uploadURL };
    } catch (error) {
      console.error('Failed to create direct upload link:', error.response?.data || error.message);
      throw new Error('Failed to create direct upload');
    }
  }
}