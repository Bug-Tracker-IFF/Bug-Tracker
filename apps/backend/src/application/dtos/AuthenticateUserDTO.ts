// src/application/dtos/AuthenticateUserDTO.ts

export interface AuthenticateUserInputDTO {
    email: string;
    password: string; 
}
  
  export interface AuthenticateUserOutputDTO {
    id: string;
    name: string;
    email: string;
    role: string;
}