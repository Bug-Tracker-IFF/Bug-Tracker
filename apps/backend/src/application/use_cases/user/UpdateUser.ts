// src/application/use_cases/user/UpdateUser.ts

import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UpdateUserInputDTO, UpdateUserOutputDTO } from "../../dtos/UpdateUserDTO";

export class UpdateUser {
    constructor(private userRepository: IUserRepository) {}

    public async execute(input: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> {
        const user = await this.userRepository.findById(input.id);
        if (!user) {
            throw new Error("User not found.");
        }

        // Verifica se o email desejado já existe e pertence a outro usuário
        if (input.email !== user.getEmail()) {
            const existingUser = await this.userRepository.findByEmail(input.email);
            if (existingUser) {
                throw new Error("User with this email already exists.");
            }
            user.email = input.email;
        }

        user.name = input.name;
        user.role = input.role;

        const updatedUser = await this.userRepository.update(user);
        if (!updatedUser) {
            throw new Error("Failed to update user.");
        }

        return {
            id: updatedUser.getId(),
            name: updatedUser.getName(),
            email: updatedUser.getEmail(),
            role: updatedUser.getRole(),
        };
    }
}
