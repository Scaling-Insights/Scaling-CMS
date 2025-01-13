import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidContentTypeException extends HttpException {
    constructor() {
        super('The content type is invalid', HttpStatus.BAD_REQUEST);
    }
}