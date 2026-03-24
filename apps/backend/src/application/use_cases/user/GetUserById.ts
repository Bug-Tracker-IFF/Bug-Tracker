// src/application/use_cases/user/GetUserById.ts
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';

export class GetUserById {
    constructor(private userRepository: IUserRepository) {}

    public async execute(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}
