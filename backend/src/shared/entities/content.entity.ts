import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { ContentType } from "../enums/content-type.enum";
import { PublicationStatus } from "../enums/publication-status.enum";


@Entity()
export class Content {

    @PrimaryColumn("bigint")
    id: BigInt;

    @ManyToOne(type => User, user => user.id)
    userID: BigInt;

    @Column("varchar")
    title: string;

    @Column({
        type: 'enum',
        enum: PublicationStatus
    })
    publicationStatus: PublicationStatus;

    @Column({
        type: 'enum',
        enum: ContentType
    })
    type: ContentType;

    @Column("bigint")
    contentItemID: BigInt;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}