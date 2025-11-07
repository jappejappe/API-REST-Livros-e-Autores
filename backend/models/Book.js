class Book {
  constructor(data) {
    this.title = data.title;
    this.summary = data.summary;
    this.authorId = data.authorId;
    this.publishedYear = data.publishedYear;
    this.genre = data.genre;
    this.quality = data.quality; // Escala de 1-5 ou texto
    this.isbn = data.isbn;
    this.pages = data.pages;
    this.language = data.language;
    this.publisher = data.publisher;
  }

  // Validação dos dados do livro
  static validate(data) {
    const errors = [];

    // Título é obrigatório
    if (!data.title || data.title.trim().length === 0) {
      errors.push('Título é obrigatório');
    } else if (data.title.length > 200) {
      errors.push('Título deve ter no máximo 200 caracteres');
    }

    // Resumo é obrigatório
    if (!data.summary || data.summary.trim().length === 0) {
      errors.push('Resumo é obrigatório');
    } else if (data.summary.length > 1000) {
      errors.push('Resumo deve ter no máximo 1000 caracteres');
    }

    // Autor é obrigatório
    if (!data.authorId || data.authorId.trim().length === 0) {
      errors.push('Autor é obrigatório');
    }

    // Ano de publicação deve ser válido
    if (data.publishedYear) {
      const year = parseInt(data.publishedYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1000 || year > currentYear) {
        errors.push('Ano de publicação deve ser um ano válido');
      }
    }

    // Gênero deve ter tamanho válido
    if (data.genre && data.genre.length > 50) {
      errors.push('Gênero deve ter no máximo 50 caracteres');
    }

    // Qualidade deve ser entre 1 e 5 se for numérica
    if (data.quality) {
      const qualityNum = parseFloat(data.quality);
      if (!isNaN(qualityNum) && (qualityNum < 1 || qualityNum > 5)) {
        errors.push('Qualidade deve ser entre 1 e 5');
      }
    }

    // Número de páginas deve ser positivo
    if (data.pages) {
      const pages = parseInt(data.pages);
      if (isNaN(pages) || pages <= 0) {
        errors.push('Número de páginas deve ser um número positivo');
      }
    }

    // ISBN deve ter formato válido (básico)
    if (data.isbn && !/^[\d-]{10,17}$/.test(data.isbn.replace(/\s/g, ''))) {
      errors.push('ISBN deve ter formato válido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Criar instância validada
  static create(data) {
    const validation = Book.validate(data);
    if (!validation.isValid) {
      throw new Error(`Dados inválidos: ${validation.errors.join(', ')}`);
    }
    return new Book(data);
  }
}

module.exports = Book;