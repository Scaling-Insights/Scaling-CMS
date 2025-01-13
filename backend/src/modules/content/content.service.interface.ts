import { UploadContentDto } from 'src/modules/content/dto/upload-content.dto';
import { GetAllContentDto } from 'src/modules/content/dto/get-all-content.dto';

export interface IContentService {
  getRangeSize(): Promise<number>;
  uploadContent(uploadContentDto: UploadContentDto, userId: BigInt): Promise<void>;
  getAllContent(userId: BigInt, rangeMin: number, rangeMax: number): Promise<GetAllContentDto>;
}