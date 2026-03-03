// DTOs para criação de usuários.
// DTOs são objetos simples que transportam dados entre as camadas da aplicação. 
// Eles são usados para definir a estrutura dos dados que serão recebidos ou enviados 
// pela aplicação, sem expor detalhes de implementação ou lógica de negócios. 
// No exemplo abaixo, temos um DTO para a entrada de dados ao criar um usuário e outro 
// para a saída dos dados após a criação do usuário.
export interface CreateUserInputDTO {
  name: string;
  email: string;
}

export interface CreateUserOutputDTO {
  id: string;
  name: string;
  email: string;
}