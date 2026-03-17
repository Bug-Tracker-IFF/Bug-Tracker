// src/application/dtos/CreateProjectDTO.ts

export interface CreateProjectInputDTO {
    name: string;
    description: string;
    managerId: string;
  }
  
  export interface CreateProjectOutputDTO {
    id: string;
    name: string;
    managerId: string;
  }