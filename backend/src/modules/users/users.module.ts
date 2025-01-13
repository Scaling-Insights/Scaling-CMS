import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { MockUserRepository } from './mocks/user.repository.mock';

@Module({
  providers: [
    UsersService,
    MockUserRepository,
    {
      provide: 'UserRepository',
      useClass: MockUserRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
