import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidLoginCredentialsException extends HttpException {
    constructor() {
        super('Invalid login credentials', HttpStatus.UNAUTHORIZED);
    }
}