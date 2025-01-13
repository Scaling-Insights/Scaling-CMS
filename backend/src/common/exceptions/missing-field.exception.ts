import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingFieldException extends HttpException {
    constructor(field: string) {
        super(`The field ${field} is missing`, HttpStatus.BAD_REQUEST);
    }
}