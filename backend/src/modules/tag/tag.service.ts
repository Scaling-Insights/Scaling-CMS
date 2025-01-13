import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/shared/entities/tag.entity';
import { MockTagRepository } from './mocks/tag.repository.mock';

@Injectable()
export class TagService {
  constructor(
    @Inject('TagRepository')
    private tagRepository: MockTagRepository,
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
