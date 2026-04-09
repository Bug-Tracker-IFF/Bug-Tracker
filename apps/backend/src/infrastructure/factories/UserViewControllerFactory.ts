// src/infrastructure/factories/UserViewControllerFactory.ts

import { PrismaUserRepository } from "../database/repositories/PrismaUserRepository";
import { GetAllUsers } from "../../application/use_cases/user/GetAllUsers";
import { GetUserById } from "../../application/use_cases/user/GetUserById";
import { CreateUser } from "../../application/use_cases/user/CreateUser";
import { UpdateUser } from "../../application/use_cases/user/UpdateUser";
import { DeleteUser } from "../../application/use_cases/user/DeleteUser";
import { UserViewController } from "../../interfaces/controllers/views/UserViewController";

export class UserViewControllerFactory {
    public static create(): UserViewController {
        const userRepository = new PrismaUserRepository();

        const getAllUsers = new GetAllUsers(userRepository);
        const getUserById = new GetUserById(userRepository);
        const createUser = new CreateUser(userRepository);
        const updateUser = new UpdateUser(userRepository);
        const deleteUser = new DeleteUser(userRepository);

        return new UserViewController(
            getAllUsers,
            getUserById,
            createUser,
            updateUser,
            deleteUser
        );
    }
}
