import express from 'express';

const app = express();
const port = 3000;  

// Middleware para entender dados JSON
app.use(express.json());

// Rota de teste para verificar se o servidor está funcionando
app.get('/api-v1/health', (req, res) => {
  res.json({ status: 'Project TS - Backend is healthy!' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});