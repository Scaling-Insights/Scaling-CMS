import { Short } from "src/shared/entities/short.entity";

export interface IShortService {
    validateShort(short: Short): void;
    createShort(
        videoLength: number,
        streamUID: string,
        description?: string,
        thumbnailLink?: string,
      ): Short;
    uploadShort(short: Short): Promise<Short>;
    findShortById(id: BigInt): Promise<Short>
}