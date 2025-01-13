import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidShortExtensionException extends HttpException {
    constructor() {
        super('The provided video file extension is not supported.', HttpStatus.BAD_REQUEST);
    }
}