import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Content } from '../entities/content.entity';
import { Tag } from '../entities/tag.entity';

@Entity()
export class ContentTag {
  @PrimaryColumn()
  contentID: BigInt;

  @PrimaryColumn()
  tagName: string;

  @ManyToOne(() => Content, (content) => content.id)
  @JoinColumn({ name: 'contentID' })
  content: Content;

  @ManyToOne(() => Tag, (tag) => tag.tagName)
  @JoinColumn({ name: 'tagName' })
  tag: Tag;
}
