// src/infrastructure/factories/AuthViewControllerFactory.ts
import { PrismaUserRepository } from '../database/repositories/PrismaUserRepository';
import { AuthenticateUser } from '../../application/use_cases/user/AuthenticateUser';
import { AuthViewController } from '../../interfaces/controllers/views/AuthViewController';

export class AuthViewControllerFactory {
  static create(): AuthViewController {
    const userRepository = new PrismaUserRepository();
    const authenticateUser = new AuthenticateUser(userRepository);
    return new AuthViewController(authenticateUser);
  }
}
