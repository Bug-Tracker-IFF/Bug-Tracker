// src/infrastructure/factories/UserViewControllerFactory.ts
import { PrismaUserRepository } from '../database/repositories/PrismaUserRepository';
import { GetUserById } from '../../application/use_cases/user/GetUserById';
import { GetAllUsers } from '../../application/use_cases/user/GetAllUsers';
import { UserViewController } from '../../interfaces/controllers/views/UserViewController';

export class UserViewControllerFactory {
  static create() {
    const userRepository = new PrismaUserRepository();
    const getUserByIdUseCase = new GetUserById(userRepository);
    const getAllUsersUseCase = new GetAllUsers(userRepository);
    return new UserViewController(getUserByIdUseCase, getAllUsersUseCase);
  }
}
