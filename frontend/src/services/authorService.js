import api from './api';

export const authorService = {
  // Buscar todos os autores
  async getAllAuthors() {
    const response = await api.get('/authors');
    return response.data;
  },

  // Criar novo autor
  async createAuthor(authorData) {
    const response = await api.post('/authors', authorData);
    return response.data;
  },

  // Buscar autor por ID
  async getAuthorById(id) {
    const response = await api.get(`/authors/${id}`);
    return response.data;
  },

  // Atualizar autor
  async updateAuthor(id, authorData) {
    const response = await api.put(`/authors/${id}`, authorData);
    return response.data;
  },

  // Deletar autor
  async deleteAuthor(id) {
    const response = await api.delete(`/authors/${id}`);
    return response.data;
  }
};