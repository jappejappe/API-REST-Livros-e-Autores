import api from './api';

export const bookService = {
  // Buscar todos os livros
  async getAllBooks() {
    const response = await api.get('/books');
    return response.data;
  },

  // Criar novo livro
  async createBook(bookData) {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  // Buscar livro por ID
  async getBookById(id) {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Atualizar livro
  async updateBook(id, bookData) {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  // Deletar livro
  async deleteBook(id) {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  }
};