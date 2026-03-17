// src/infrastructure/factories/AuthControllerFactory.ts

import { PrismaUserRepository } from '../database/repositories/PrismaUserRepository';
import { AuthenticateUser } from '../../application/use_cases/user/AuthenticateUser';
import { AuthController } from '../../interfaces/controllers/AuthController';

export class AuthControllerFactory {
  static create(): AuthController {
    const userRepository = new PrismaUserRepository();
    const authenticateUserUseCase = new AuthenticateUser(userRepository);
    return new AuthController(authenticateUserUseCase);
  }
}