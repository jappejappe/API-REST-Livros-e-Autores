const { v4: uuidv4 } = require('uuid');

// Arrays em memória para armazenar os dados
const storage = {
  books: [],
  authors: []
};

// Funções auxiliares para gerenciar os dados
const storageHelpers = {
  // Gerar ID único
  generateId: () => uuidv4(),

  // Buscar livro por ID
  findBookById: (id) => storage.books.find(book => book.id === id),

  // Buscar autor por ID
  findAuthorById: (id) => storage.authors.find(author => author.id === id),

  // Buscar livros por autor
  findBooksByAuthor: (authorId) => storage.books.filter(book => book.authorId === authorId),

  // Adicionar livro
  addBook: (bookData) => {
    const book = {
      id: storageHelpers.generateId(),
      ...bookData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    storage.books.push(book);
    return book;
  },

  // Adicionar autor
  addAuthor: (authorData) => {
    const author = {
      id: storageHelpers.generateId(),
      ...authorData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    storage.authors.push(author);
    return author;
  },

  // Atualizar livro
  updateBook: (id, bookData) => {
    const index = storage.books.findIndex(book => book.id === id);
    if (index === -1) return null;
    
    storage.books[index] = {
      ...storage.books[index],
      ...bookData,
      updatedAt: new Date()
    };
    return storage.books[index];
  },

  // Atualizar autor
  updateAuthor: (id, authorData) => {
    const index = storage.authors.findIndex(author => author.id === id);
    if (index === -1) return null;
    
    storage.authors[index] = {
      ...storage.authors[index],
      ...authorData,
      updatedAt: new Date()
    };
    return storage.authors[index];
  },

  // Deletar livro
  deleteBook: (id) => {
    const index = storage.books.findIndex(book => book.id === id);
    if (index === -1) return false;
    
    storage.books.splice(index, 1);
    return true;
  },

  // Deletar autor
  deleteAuthor: (id) => {
    const index = storage.authors.findIndex(author => author.id === id);
    if (index === -1) return false;
    
    storage.authors.splice(index, 1);
    return true;
  },

  // Obter todos os livros com informações do autor
  getAllBooksWithAuthors: () => {
    return storage.books.map(book => {
      const author = storageHelpers.findAuthorById(book.authorId);
      return {
        ...book,
        author: author || null
      };
    });
  },

  // Obter todos os autores
  getAllAuthors: () => storage.authors,

  // Obter todos os livros
  getAllBooks: () => storage.books
};

module.exports = { storage, storageHelpers };