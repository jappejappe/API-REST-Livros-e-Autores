class Author {
  constructor(data) {
    this.name = data.name;
    this.biography = data.biography;
    this.birthYear = data.birthYear;
    this.nationality = data.nationality;
  }

  // Validação dos dados do autor
  static validate(data) {
    const errors = [];

    // Nome é obrigatório
    if (!data.name || data.name.trim().length === 0) {
      errors.push('Nome é obrigatório');
    } else if (data.name.length > 100) {
      errors.push('Nome deve ter no máximo 100 caracteres');
    }

    // Biografia deve ter tamanho válido
    if (data.biography && data.biography.length > 1000) {
      errors.push('Biografia deve ter no máximo 1000 caracteres');
    }

    // Ano de nascimento deve ser válido
    if (data.birthYear) {
      const year = parseInt(data.birthYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1000 || year > currentYear) {
        errors.push('Ano de nascimento deve ser um ano válido');
      }
    }

    // Nacionalidade deve ter tamanho válido
    if (data.nationality && data.nationality.length > 50) {
      errors.push('Nacionalidade deve ter no máximo 50 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Criar instância validada
  static create(data) {
    const validation = Author.validate(data);
    if (!validation.isValid) {
      throw new Error(`Dados inválidos: ${validation.errors.join(', ')}`);
    }
    return new Author(data);
  }
}

module.exports = Author;