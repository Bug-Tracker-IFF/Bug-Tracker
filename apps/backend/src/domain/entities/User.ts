// src/domain/entities/User.ts

export enum UserRole {
  GERENTE = 'GERENTE',
  DESENVOLVEDOR = 'DESENVOLVEDOR',
  QA = 'QA'
}

export class User {
  public id: string;
  public name: string;
  public email: string;
  public passwordHash: string;
  public role: UserRole;

  constructor(id: string, name: string, email: string, passwordHash: string, role: UserRole) {
    if (!name || name.length < 3) throw new Error('Name must be at least 3 characters long');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email format');
    if (!passwordHash) throw new Error('Password hash is required');
    if (!Object.values(UserRole).includes(role)) throw new Error('Invalid user role');

    this.id = id || "new-id-" + Date.now();
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
  }

  public getId(): string { return this.id; }
  public getName(): string { return this.name; }
  public getEmail(): string { return this.email; }
  public getPasswordHash(): string { return this.passwordHash; }
  public getRole(): UserRole { return this.role; }
}