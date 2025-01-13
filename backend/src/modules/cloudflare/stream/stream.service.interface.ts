import { DirectUploadLinkDto } from "./dto/DirectUploadLink.dto";

export interface IStreamService {
    createDirectUploadLink(userId: BigInt): Promise<DirectUploadLinkDto>;
}