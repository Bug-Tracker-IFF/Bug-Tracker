// src/interfaces/controllers/ProjectController.ts

import { Request, Response } from 'express';
import { CreateProject } from '../../application/use_cases/project/CreateProject';

export class ProjectController {
  constructor(private createProject: CreateProject) {}

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      // Pega os dados que vieram no corpo da requisição (Postman/Insomnia)
      const inputDTO = req.body;
      
      // Executa a regra de negócio
      const outputDTO = await this.createProject.execute(inputDTO);
      
      // Retorna 201 (Created) e os dados do projeto criado
      return res.status(201).json(outputDTO);
    } catch (error) {
      if (error instanceof Error) {
        // Se for um erro de validação ou regra de negócio (ex: usuário não é gerente)
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}