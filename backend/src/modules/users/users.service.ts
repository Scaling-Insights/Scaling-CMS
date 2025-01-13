import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { IUserService } from './users.service.interface';

@Injectable()
export class UsersService implements IUserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

    async findUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email }});
    }
    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find()
    }
}