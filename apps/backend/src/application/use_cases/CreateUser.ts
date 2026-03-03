//
import { User } from "../../domain/entities/user"; 
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../dtos/CreateUserInputDTO";

export class CreateUser {
    constructor(private userRepository: IUserRepository) {}

    public async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
        // Verificar se o usuário já existe com o mesmo email.
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        // Criar um novo usuário
        const user = new User("",input.name, input.email);

        // Salvar o usuário no repositório
        await this.userRepository.save(user);

        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
        };
    }
}