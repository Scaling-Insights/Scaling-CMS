import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/shared/entities/tag.entity';
import { ITagService } from './tag.service.interface';

@Injectable()
export class TagService implements ITagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async createTag(tagName: string): Promise<Tag> {
    const tag = new Tag();
    tag.tagName = tagName;
    return this.tagRepository.save(tag);
  }

  async findTagByName(tagName: string): Promise<Tag> {
    return this.tagRepository.findOne({ where: { tagName } });
  }
}