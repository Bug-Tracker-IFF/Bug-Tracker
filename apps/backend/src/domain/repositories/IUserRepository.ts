// src/domain/repositories/IUserRepository.ts

import { User } from "../entities/User";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[] | null>;
  save(user: User): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  update(user: User): Promise<User | null>;
}