// Exemplo de entidade de domínio para um usuário, com validação e lógica de negócio

export class User {
  private id: string;
  public name: string;
  public email: string;

  constructor(id: string, name: string, email: string) {
    if (!name || name.length < 3) {
        throw new Error('Name must be at least 3 characters long');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Invalid email format');
    }

    this.id = id || "new-id-" + Date.now(); //Aqui poderia ser gerado um ID com base numa regra de negócio em específica.
    this.name = name;
    this.email = email;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string { 
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public isVipUser(): boolean {
    // Lógica para determinar se o usuário é VIP, por exemplo, baseado em um campo ou regra de negócio
    return this.email.endsWith('@vip.com'); // Exemplo simples: usuários com email terminando em '@vip.com' são considerados VIP
  }
}