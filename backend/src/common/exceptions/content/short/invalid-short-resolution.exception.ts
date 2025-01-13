import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidShortResolutionException extends HttpException {
    constructor() {
        super('Video resolution cannot exceed 1080p.', HttpStatus.BAD_REQUEST);
    }
}