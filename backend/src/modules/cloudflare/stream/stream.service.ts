import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { DirectUploadLinkDto } from './dto/DirectUploadLink.dto';

@Injectable()
export class StreamService {
  constructor(private readonly configService: ConfigService) {}

  async createDirectUploadLink(userId: BigInt): Promise<DirectUploadLinkDto> {
    const cloudflareKey = this.configService.get<string>('CLOUDFLARE_KEY');
    const cloudflareAccountId =
      this.configService.get<string>('CLOUDFLARE_UID');
    const linkExpiresIn = parseInt(
      this.configService.get<string>('CLOUDFLARE_EXPIRES_IN').replace('s', ''),
      10,
    );

    const expiry = new Date(Date.now() + linkExpiresIn * 1000).toISOString();

    if (!cloudflareKey || !cloudflareAccountId) {
      throw new Error('Cloudflare credentials are not properly set.');
    }

    // Fake response data
    const fakeResponse = {
      result: {
        uid: 'fake-uid-12345',
        uploadURL: 'meowmeowmeowmeowmeowmeowmeow',
      },
    };

    const { uid, uploadURL } = fakeResponse.result;
    return { uid, uploadURL };
  }
}
