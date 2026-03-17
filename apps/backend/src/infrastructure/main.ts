// src/infrastructure/main.ts

import express from 'express';
import { UserControllerFactory } from './factories/UserControllerFactory';
import { ProjectControllerFactory } from './factories/ProjectControllerFactory';
import { TicketControllerFactory } from './factories/TicketControllerFactory';
import { AuthControllerFactory } from './factories/AuthControllerFactory';

const app = express();
const port = 3000;  

// Middleware para entender dados JSON que vêm no corpo da requisição
app.use(express.json());

// Rota de saúde para verificar se o servidor está no ar
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'Bug Tracker Backend is healthy!' });
});

// Instanciando os Controllers através das Factories
const userController = UserControllerFactory.create();
const projectController = ProjectControllerFactory.create();
const ticketController = TicketControllerFactory.create();
const authController = AuthControllerFactory.create();

// ==========================================
// ROTAS DA APLICAÇÃO
// ==========================================

// Usuários
app.post('/api/v1/users', (req, res) => userController.create(req, res));

// Projetos
app.post('/api/v1/projects', (req, res) => projectController.create(req, res));

// Chamados (Tickets)
app.post('/api/v1/tickets', (req, res) => ticketController.create(req, res));

// Autenticação
app.post('/api/v1/auth/login', (req, res) => authController.login(req, res));

// Assign Ticket
app.post('/api/v1/tickets/:id/assign', (req, res) => ticketController.assign(req, res));

// Update Ticket Status
app.patch('/api/v1/tickets/:id/status', (req, res) => ticketController.updateStatus(req, res)); // Usamos PATCH porque atualiza só uma parte

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});