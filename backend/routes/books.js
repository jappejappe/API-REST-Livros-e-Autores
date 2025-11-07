const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET /api/books - Listar todos os livros
router.get('/', bookController.getAllBooks);

// POST /api/books - Criar novo livro
router.post('/', bookController.createBook);

// GET /api/books/:id - Buscar livro por ID
router.get('/:id', bookController.getBookById);

// PUT /api/books/:id - Atualizar livro
router.put('/:id', bookController.updateBook);

// DELETE /api/books/:id - Deletar livro
router.delete('/:id', bookController.deleteBook);

module.exports = router;