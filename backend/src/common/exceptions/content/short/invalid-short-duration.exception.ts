import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidShortDurationException extends HttpException {
    constructor() {
        super('The video length of a short cannot be longer than 60 seconds', HttpStatus.BAD_REQUEST);
    }
}