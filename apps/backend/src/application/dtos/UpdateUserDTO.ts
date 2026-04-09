// src/application/dtos/UpdateUserDTO.ts
import { UserRole } from "../../domain/entities/User";

export interface UpdateUserInputDTO {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface UpdateUserOutputDTO {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}
