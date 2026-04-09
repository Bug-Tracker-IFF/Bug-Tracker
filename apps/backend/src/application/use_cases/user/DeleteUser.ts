// src/application/use_cases/user/DeleteUser.ts

import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class DeleteUser {
    constructor(private userRepository: IUserRepository) {}

    public async execute(id: string): Promise<boolean> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found.");
        }

        const success = await this.userRepository.delete(id);
        if (!success) {
            throw new Error("Failed to delete user.");
        }

        return true;
    }
}
