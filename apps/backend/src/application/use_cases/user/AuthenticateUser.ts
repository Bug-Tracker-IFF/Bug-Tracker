// src/application/use_cases/user/AuthenticateUser.ts

import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { AuthenticateUserInputDTO, AuthenticateUserOutputDTO } from "../../dtos/AuthenticateUserDTO";
import bcrypt from 'bcryptjs';

export class AuthenticateUser {
  constructor(private userRepository: IUserRepository) {}

  public async execute(input: AuthenticateUserInputDTO): Promise<AuthenticateUserOutputDTO> {
    // 1. Busca o usuário pelo e-mail
    const user = await this.userRepository.findByEmail(input.email);

    // 2. Se não encontrar, lança erro de credenciais (regra de segurança: não diga se o e-mail existe ou não)
    if (!user) {
      throw new Error("Invalid credentials.");
    }
    
    // 3. Valida a senha usando bcrypt (comparando a senha em texto com o hash armazenado)
    const passwordMatch = await bcrypt.compare(input.password, user.getPasswordHash());
    if (!passwordMatch) {
        throw new Error("Invalid credentials."); 
    }
    
    // 4. Retorna os dados do usuário logado
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
    };
  }
}