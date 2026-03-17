// src/application/dtos/AddMemberToProjectDTO.ts

export interface AddMemberToProjectInputDTO {
    projectId: string;
    userId: string;       // O Desenvolvedor/QA que será adicionado
    requesterId: string;  // Quem está fazendo o pedido (deve ser o Gerente do projeto)
}