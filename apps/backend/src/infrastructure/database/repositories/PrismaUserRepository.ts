// src/infrastructure/database/repositories/PrismaUserRepository.ts

import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User, UserRole } from '../../../domain/entities/User'; // Importe o UserRole

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? new User(user.id, user.name, user.email, user.password, user.role as UserRole) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? new User(user.id, user.name, user.email, user.password, user.role as UserRole) : null;
  }

  async findAll(): Promise<User[] | null> {
    const users = await this.prisma.user.findMany();
    return users.length 
      ? users.map(user => new User(user.id, user.name, user.email, user.password, user.role as UserRole)) 
      : null;
  }

  async save(user: User): Promise<User | null> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.passwordHash, 
        role: user.role, 
      },
    });
    return createdUser ? new User(createdUser.id, createdUser.name, createdUser.email, createdUser.password, createdUser.role as UserRole) : null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async update(user: User): Promise<User | null> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name,
          email: user.email,
          role: user.role, 
        },
      });
      return updatedUser ? new User(updatedUser.id, updatedUser.name, updatedUser.email, updatedUser.password, updatedUser.role as UserRole) : null;
    } catch (error) {
      return null;
    }
  }
}