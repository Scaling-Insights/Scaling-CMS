import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Short } from 'src/shared/entities/short.entity';
import { MissingFieldException } from 'src/common/exceptions/missing-field.exception';
import { InvalidShortDurationException } from 'src/common/exceptions/content/short/invalid-short-duration.exception';
import { SnowflakeService } from 'src/modules/snowflake/snowflake.service';
import { MockShortRepository } from './mocks/short.repository.mock';

@Injectable()
export class ShortService {
  constructor(
    @Inject('ShortRepository')
    private shortRepository: MockShortRepository,
    private readonly snowflakeService: SnowflakeService,
  ) {}

  validateShort(short: Short): void {
    const requiredFields = ['videoLength', 'streamUID'];

    for (const field of requiredFields) {
      if (!short[field]) {
        throw new MissingFieldException(field);
      }
    }

    if (short.videoLength > 60) {
      throw new InvalidShortDurationException();
    }
  }

  createShort(
    videoLength: number,
    streamUID: string,
    description?: string,
    thumbnailLink?: string,
  ): Short {
    const short = new Short();
    short.id = this.snowflakeService.generateId();
    short.videoLength = videoLength;
    short.streamUID = streamUID;
    short.description = description;
    short.thumbnailLink = thumbnailLink;

    this.validateShort(short);
    return short;
  }

  async uploadShort(short: Short): Promise<Short> {
    return this.shortRepository.save(short);
  }

  async findShortById(id: BigInt): Promise<Short> {
    return this.shortRepository.findOne({ where: { id } });
  }
}
