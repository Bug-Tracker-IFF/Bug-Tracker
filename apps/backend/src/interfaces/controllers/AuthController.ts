// src/interfaces/controllers/AuthController.ts

import { Request, Response } from 'express';
import { AuthenticateUser } from '../../application/use_cases/user/AuthenticateUser';

export class AuthController {
  constructor(private authenticateUser: AuthenticateUser) {}

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const inputDTO = req.body;
      const outputDTO = await this.authenticateUser.execute(inputDTO);
      
      // Retorna 200 (OK) e os dados do usuário logado
      return res.status(200).json(outputDTO);
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid credentials.") {
        // Retorna 401 (Unauthorized) se a senha ou e-mail estiverem errados
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}