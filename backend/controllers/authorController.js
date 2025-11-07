const Author = require('../models/Author');
const { storageHelpers } = require('../data/storage');

const authorController = {
  // Listar todos os autores
  getAllAuthors: (req, res) => {
    try {
      const authors = storageHelpers.getAllAuthors();
      res.json({
        success: true,
        data: authors,
        message: 'Autores recuperados com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erro ao buscar autores',
          details: error.message
        }
      });
    }
  },

  // Criar novo autor
  createAuthor: (req, res) => {
    try {
      const validation = Author.validate(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Dados inválidos',
            details: validation.errors
          }
        });
      }

      const authorData = new Author(req.body);
      const createdAuthor = storageHelpers.addAuthor(authorData);

      res.status(201).json({
        success: true,
        data: createdAuthor,
        message: 'Autor criado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erro ao criar autor',
          details: error.message
        }
      });
    }
  },

  // Buscar autor por ID
  getAuthorById: (req, res) => {
    try {
      const { id } = req.params;
      const author = storageHelpers.findAuthorById(id);

      if (!author) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Autor não encontrado'
          }
        });
      }

      res.json({
        success: true,
        data: author,
        message: 'Autor encontrado'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erro ao buscar autor',
          details: error.message
        }
      });
    }
  },

  // Atualizar autor
  updateAuthor: (req, res) => {
    try {
      const { id } = req.params;
      
      // Verificar se autor existe
      const existingAuthor = storageHelpers.findAuthorById(id);
      if (!existingAuthor) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Autor não encontrado'
          }
        });
      }

      // Validar dados
      const validation = Author.validate(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Dados inválidos',
            details: validation.errors
          }
        });
      }

      const authorData = new Author(req.body);
      const updatedAuthor = storageHelpers.updateAuthor(id, authorData);

      res.json({
        success: true,
        data: updatedAuthor,
        message: 'Autor atualizado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erro ao atualizar autor',
          details: error.message
        }
      });
    }
  },

  // Deletar autor
  deleteAuthor: (req, res) => {
    try {
      const { id } = req.params;
      
      // Verificar se autor existe
      const existingAuthor = storageHelpers.findAuthorById(id);
      if (!existingAuthor) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Autor não encontrado'
          }
        });
      }

      // Verificar se há livros associados
      const booksWithAuthor = storageHelpers.findBooksByAuthor(id);
      if (booksWithAuthor.length > 0) {
        return res.status(409).json({
          success: false,
          error: {
            code: 'CONFLICT',
            message: 'Não é possível deletar autor que possui livros cadastrados',
            details: `Autor possui ${booksWithAuthor.length} livro(s) cadastrado(s)`
          }
        });
      }

      const deleted = storageHelpers.deleteAuthor(id);
      if (!deleted) {
        return res.status(500).json({
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Erro ao deletar autor'
          }
        });
      }

      res.json({
        success: true,
        message: 'Autor deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erro ao deletar autor',
          details: error.message
        }
      });
    }
  }
};

module.exports = authorController;