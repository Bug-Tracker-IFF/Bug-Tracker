// src/domain/entities/Project.ts

export class Project {
    public id: string;
    public name: string;
    public description: string;
    public managerId: string; // ID do usuário Gerente
    public createdAt: Date;
  
    constructor(id: string, name: string, description: string, managerId: string, createdAt?: Date) {
      if (!name || name.length < 3) throw new Error('Project name must be at least 3 characters long');
      if (!managerId) throw new Error('Project must have a manager');
  
      this.id = id || "proj-id-" + Date.now();
      this.name = name;
      this.description = description;
      this.managerId = managerId;
      this.createdAt = createdAt || new Date();
    }
}