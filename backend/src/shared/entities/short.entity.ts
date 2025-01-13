import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Short {

    @PrimaryColumn('bigint')
    id: BigInt;

    @Column({ type: 'int' })
    videoLength: number;

    @Column()
    streamUID: string;

    @Column({ nullable: true})
    description: string;

    @Column({ nullable: true })
    thumbnailLink: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
