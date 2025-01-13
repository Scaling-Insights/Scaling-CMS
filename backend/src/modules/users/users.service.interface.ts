import { User } from "src/shared/entities/user.entity";

export interface IUserService {
    findUserByEmail(email: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}