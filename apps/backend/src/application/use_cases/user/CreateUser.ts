// src/application/use_cases/user/CreateUser.ts

import { User } from "../../../domain/entities/User"; 
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../../dtos/CreateUserDTO";
import bcrypt from 'bcryptjs';

export class CreateUser {
    constructor(private userRepository: IUserRepository) {}

    public async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
        // Verificar se o usuário já existe com o mesmo email.
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            throw new Error("User with this email already exists.");
        }
        
        const hashedPassword = await bcrypt.hash(input.password, 10);

        const user = new User("", input.name, input.email, hashedPassword ,input.role);

        // Salvar o usuário no repositório
        await this.userRepository.save(user);

        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            role: user.getRole(),
        };
    }
}