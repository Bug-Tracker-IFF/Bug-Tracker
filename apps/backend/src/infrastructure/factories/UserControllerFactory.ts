// src/infrastructure/factories/UserControllerFactory.ts

import { PrismaUserRepository } from '../database/repositories/PrismaUserRepository';
import { CreateUser } from '../../application/use_cases/user/CreateUser';
import { UserController } from '../../interfaces/controllers/UserController';

export class UserControllerFactory {
  static create(){
    const userRepository = new PrismaUserRepository();
    const createUserUseCase = new CreateUser(userRepository);
    return new UserController(createUserUseCase);
  }
}
