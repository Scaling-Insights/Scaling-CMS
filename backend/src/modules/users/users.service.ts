import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { MockUserRepository } from './mocks/user.repository.mock';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private userRepository: MockUserRepository,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
