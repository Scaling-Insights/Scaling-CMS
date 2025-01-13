import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ContentDto } from './content.dto';

export class GetAllContentDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ContentDto)
    contents: ContentDto[];
}