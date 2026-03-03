// Exemplo de interface de repositório para usuários, definindo os métodos que devem ser 
// implementados por qualquer classe que queira atuar como repositório de usuários. Essa 
// interface é parte do domínio e não deve conter detalhes de implementação, apenas a definição 
// dos métodos necessários para manipular os dados dos usuários.
import { User } from "../entities/user";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
    