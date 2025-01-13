import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPublicationStatusException extends HttpException {
    constructor() {
        super('The publication status is invalid', HttpStatus.BAD_REQUEST);
    }
}