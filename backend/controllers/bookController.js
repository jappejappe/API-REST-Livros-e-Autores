const Book = require('../models/Book');
const { storageHelpers } = require('../data/storage');

const bookController = {
  // Listar todos os livros com informações do autor
  getAllBooks: (req, res) => {
    try {
      const books = storageHelpers.getAllBooksWithAuthors();
      res.json({
        success: true,
        data: books,
        message: 'Livros recuperados com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erro ao buscar livros',
          details: error.message
        }
      });
    }
  },

  // Criar novo livro
  createBook: (req, res) => {
    try {
      // Validar dados do livro
      const validation = Book.validate(req.body);
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

      // Verificar se o autor existe
      const author = storageHelpers.findAuthorById(req.body.authorId);
      if (!author) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Autor não encontrado',
            details: ['O autor selecionado não existe']
          }
        });
      }

      const bookData = new Book(req.body);
      const createdBook = storageHelpers.addBook(bookData);

      // Retornar livro com informações do autor
      const bookWithAuthor = {
        ...createdBook,
        author
      };

      res.status(201).json({
        success: true,
        data: bookWithAuthor,
        message: 'Livro criado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erro ao criar livro',
          details: error.message
        }
      });
    }
  },

  // Buscar livro por ID
  getBookById: (req, res) => {
    try {
      const { id } = req.params;
      const book = storageHelpers.findBookById(id);

      if (!book) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Livro não encontrado'
          }
        });
      }

      // Buscar informações do autor
      const author = storageHelpers.findAuthorById(book.authorId);
      const bookWithAuthor = {
        ...book,
        author: author || null
      };

      res.json({
        success: true,
        data: bookWithAuthor,
        message: 'Livro encontrado'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erro ao buscar livro',
          details: error.message
        }
      });
    }
  },

  // Atualizar livro
  updateBook: (req, res) => {
    try {
      const { id } = req.params;
      
      // Verificar se livro existe
      const existingBook = storageHelpers.findBookById(id);
      if (!existingBook) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Livro não encontrado'
          }
        });
      }

      // Validar dados
      const validation = Book.validate(req.body);
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

      // Verificar se o autor existe
      const author = storageHelpers.findAuthorById(req.body.authorId);
      if (!author) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Autor não encontrado',
            details: ['O autor selecionado não existe']
          }
        });
      }

      const bookData = new Book(req.body);
      const updatedBook = storageHelpers.updateBook(id, bookData);

      // Retornar livro com informações do autor
      const bookWithAuthor = {
        ...updatedBook,
        author
      };

      res.json({
        success: true,
        data: bookWithAuthor,
        message: 'Livro atualizado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erro ao atualizar livro',
          details: error.message
        }
      });
    }
  },

  // Deletar livro
  deleteBook: (req, res) => {
    try {
      const { id } = req.params;
      
      // Verificar se livro existe
      const existingBook = storageHelpers.findBookById(id);
      if (!existingBook) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Livro não encontrado'
          }
        });
      }

      const deleted = storageHelpers.deleteBook(id);
      if (!deleted) {
        return res.status(500).json({
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Erro ao deletar livro'
          }
        });
      }

      res.json({
        success: true,
        message: 'Livro deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erro ao deletar livro',
          details: error.message
        }
      });
    }
  }
};

module.exports = bookController;