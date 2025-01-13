import { User } from 'src/shared/entities/user.entity';

export class MockUserRepository {
  private users: User[] = [
    {
      id: 7265738540758077449n,
      username: 'Peterpan',
      email: 'Peter@pan.nl',
      password: 'peterpan123',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
    },
  ];

  async findOne({ where: { email } }): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async find(): Promise<User[]> {
    return this.users;
  }

  async save(user: User): Promise<User> {
    // this.users.push(user);
    return user;
  }
}
