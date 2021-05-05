import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UsersService {
  async create(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    /** Retorna o usuário caso já exista */
    const userFound = await usersRepository.findOne({ email });
    if (userFound) return userFound;

    const user = usersRepository.create({
      email,
    });

    await usersRepository.save(user);
    return user;
  }
}

export { UsersService };
