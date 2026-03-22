# Sistema de Rastreamento de Bugs (Bug Tracker)

## Descrição do Tema
Este projeto consiste em uma API RESTful para um Sistema de Rastreamento de Bugs (Bug Tracker), desenvolvida como requisito de avaliação acadêmica. O sistema permite o gerenciamento completo do ciclo de vida de falhas de software, englobando a criação de projetos, controle de acesso baseado em perfis (Gerente, Desenvolvedor e QA), abertura de chamados (tickets), atribuição de responsáveis e inclusão de logs (comentários) e metadados de anexos. 

O diferencial técnico desta aplicação é a sua estruturação baseada nos princípios da **Clean Architecture** (Arquitetura Limpa). O código está rigorosamente separado em camadas de Domínio, Aplicação, Interfaces e Infraestrutura, garantindo que as regras de negócio sejam isoladas de frameworks externos. A aplicação também implementa uma Máquina de Estados para garantir a transição segura e lógica dos status dos chamados.

Tecnologias utilizadas: Node.js, TypeScript, Express, Prisma ORM, SQLite e Bcryptjs.

---

## Diagrama de Classes e Entidade-Relacionamento
Abaixo está a representação estrutural das entidades do domínio e como elas se relacionam no banco de dados. O Chamado (Ticket) atua como a Raiz de Agregação para Comentários e Anexos.

![Diagrama de Classes e ER](Docs/Diagrama_de_Classe_Bug-Tracker.jpg)
---

## Exemplo de Chamada (Principal POST do Sistema)
O núcleo do sistema é a abertura de um chamado (Ticket). Abaixo está o exemplo do payload (JSON) necessário para a criação de um bug, relacionando-o a um Projeto e a um Usuário (Reportador).

**Endpoint:** `POST /api/v1/tickets`


**Corpo da Requisição (JSON):**
```json
{
  "title": "Falha de autenticação na tela principal",
  "description": "Ao inserir credenciais válidas e clicar em 'Entrar', o sistema retorna erro 500 intermitente e não redireciona para o dashboard.",
  "reporterId": "id-do-usuario-qa-gerado-no-banco",
  "projectId": "id-do-projeto-gerado-no-banco"
}
```

**Resposta de Sucesso (201 Created):**
```json
{
  "id": "uuid-gerado-automaticamente",
  "title": "Falha de autenticação na tela principal",
  "description": "Ao inserir credenciais válidas e clicar em 'Entrar', o sistema retorna erro 500 intermitente e não redireciona para o dashboard.",
  "status": "ABERTO",
  "reporterId": "id-do-usuario-qa-gerado-no-banco",
  "projectId": "id-do-projeto-gerado-no-banco",
  "createdAt": "2023-10-27T10:00:00.000Z"
}
```

## Testes de Endpoint (Postman / Insomnia)

Para facilitar a avaliação e validação de todas as rotas da aplicação (criação de usuários, autenticação, projetos, chamados e máquina de estados), foi disponibilizada uma coleção completa de requisições.

O arquivo contendo a coleção encontra-se no repositório no seguinte caminho: [/Docs/BugTracker.postman_collection.json](BugTracker.postman_collection.json)

## Instruções de uso:
1. Abra o Postman ou Insomnia.
2. Selecione a opção Import e arraste o arquivo ```BugTracker.postman_collection.json```.
3. Atenção à URL base: As requisições na coleção estão configuradas com uma URL de exemplo do Codespaces. Substitua a URL base das requisições pela URL gerada no seu ambiente (veja as instruções de execução abaixo).
4. Execute as requisições respeitando a ordem lógica (Criar Usuários -> Autenticar -> Criar Projeto -> Criar Ticket (Opcional: Add Comment, Add Attachment - metadado) -> Atualizar Ticket).

## Como executar o projeto localmente

1. No repositório, abra o codespace.

2. Aguarde o contêiner ser construído. No terminal do Codespace, é obrigatório acessar o diretório do backend e instalar as dependências antes de executar qualquer comando:
```bash
cd apps/backend
npm install
```

3. Em seguida, execute as migrações para criar as tabelas no banco de dados SQLite:

```bash
npx prisma migrate dev
```

4. Inicie o servidor:
```bash
npm run dev
```

5. Passo fundamental para o Postman: No terminal inferior do VS Code web, clique na aba Ports (Portas). Identifique a porta 3000, clique com o botão direito nela, vá em Port Visibility (Visibilidade da porta) e altere para Public.

6. Copie o endereço gerado (ex: https://<nome-do-codespace>-3000.app.github.dev) e utilize-o como URL base no Postman.