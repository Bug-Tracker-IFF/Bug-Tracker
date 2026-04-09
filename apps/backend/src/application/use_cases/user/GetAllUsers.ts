// src/application/use_cases/user/GetAllUsers.ts
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';

export class GetAllUsers {
    constructor(private userRepository: IUserRepository) {}

    public async execute(): Promise<User[]> {
        const users = await this.userRepository.findAll();
        return users || [];
    }
}
