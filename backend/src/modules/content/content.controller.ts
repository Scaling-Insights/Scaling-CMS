import { UploadContentDto } from 'src/modules/content/dto/upload-content.dto';
import { ContentService } from 'src/modules/content/content.service';
import { GetAllContentDto } from 'src/modules/content/dto/get-all-content.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { StreamService } from '../cloudflare/stream/stream.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { R2Service } from '../cloudflare/r2/r2.service';
import { ConfigService } from '@nestjs/config';
import { SnowflakeService } from '../snowflake/snowflake.service';

@Controller('content')
export class ContentController {
	constructor(
		private readonly contentService: ContentService,
		private readonly streamService: StreamService,
		private readonly r2Service: R2Service,
		private readonly configService: ConfigService,
		private readonly snowflakeService: SnowflakeService,
	) { }
	private readonly bucketName = this.configService.get<string>('R2_BUCKET_NAME');
	private readonly linkExpiresIn = this.configService.get<number>('CLOUDFLARE_EXPIRES_IN');

	@UseGuards(AuthGuard)
	@Post('upload')
	async uploadContent(
		@Req() request: Request,
		@Body() uploadContentDto: UploadContentDto,
	): Promise<void> {
		const userId = BigInt(request['user'].sub);
		await this.contentService.uploadContent(uploadContentDto, userId);
	}

	@UseGuards(AuthGuard)
	@Get('request-video-upload-url')
	async createDirectUploadLink(
		@Req() request: Request,
	): Promise<{ data: { streamUploadUrl: string; shortVideoUid: string; } }> {
		const userId = BigInt(request['user'].sub);
		const shortVideoLink = await this.streamService.createDirectUploadLink(userId);
		console.log('Created direct upload link for stream:', shortVideoLink);
		return {
			data: {
				streamUploadUrl: shortVideoLink.uploadURL,
				shortVideoUid: shortVideoLink.uid,
			}
		}
	}

	@UseGuards(AuthGuard)
	@Post('request-thumbnail-upload-url')
	async createDirectUploadLinkThumbnail(
		@Req() request: Request,
		@Body() body: { contentSize: number, fileType: string, fileName: string }
	): Promise<{ data: { r2UploadUrl: string, r2UploadUid: string } }> {
		const objectKey = `${body.fileName}-${this.snowflakeService.generateId()}`;
		if (this.bucketName === undefined) {
			throw new Error('No bucket name is not defined');
		}
		const thumbnailUploadLink = await this.r2Service.generatePresignedUploadUrl(this.bucketName, objectKey.toString(), this.linkExpiresIn, body.contentSize, body.fileType);
		console.log('Created direct upload link for R2');
		return {
			data: {
				r2UploadUrl: thumbnailUploadLink.uploadURL,
				r2UploadUid: thumbnailUploadLink.uid,
			}
		}
	}

	@UseGuards(AuthGuard)
	@Post('get-range')
	async getAllContent(
		@Req() request: Request,
		@Body() body: { rangeMin: number; rangeMax: number }
	): Promise<{ rangeSize: number; contents: GetAllContentDto }> {
		if (body.rangeMin == undefined || body.rangeMax == undefined) {
			body.rangeMin = 0;
			body.rangeMax = 10;
		}
		const userId = BigInt(request['user'].sub);

		const rangeSize = await this.contentService.getRangeSize();

		const contents: GetAllContentDto = await this.contentService.getAllContent(
			userId,
			body.rangeMin,
			body.rangeMax,
		);

		console.log('Fetched content for user: ', userId);

		return {
			rangeSize,
			contents,
		};
	}
}