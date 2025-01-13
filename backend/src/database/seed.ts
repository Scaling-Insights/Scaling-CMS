import { AppDataSource } from './data-source';
import { User } from '../shared/entities/user.entity';

export async function seedDatabase() {
  const userRepo = AppDataSource.getRepository(User);

  // Check for the default user
  const existingUser = await userRepo.findOne({ where: { id: 7265738540758077449n } });
  if (!existingUser) {
    const user = new User();
    user.id = 7265738540758077449n;
    user.username = 'Peterpan';
    user.email = 'Peter@pan.nl';
    user.password = 'peterpan123';

    await userRepo.save(user);
    console.log('Default user created:', user);
  } else {
    console.log('Default user already exists:', existingUser);
  }
}
