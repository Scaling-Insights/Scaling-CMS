import { Injectable } from '@nestjs/common';
import { AppDataSource } from "../../database/data-source";
import { User } from 'src/shared/entities/user.entity';
import { createDefaultUser } from 'src/database';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const userRepo = AppDataSource.getRepository(User);
    const userArray = await userRepo.find();

    if (userArray.length === 0) {
      //console.log("No user found, creating default user");
      const createdUser = await createDefaultUser();
      return `Created user: ${createdUser.username}`;
    }

    return userArray[0].username;
  }
}