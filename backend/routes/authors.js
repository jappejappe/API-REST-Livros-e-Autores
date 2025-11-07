const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// GET /api/authors - Listar todos os autores
router.get('/', authorController.getAllAuthors);

// POST /api/authors - Criar novo autor
router.post('/', authorController.createAuthor);

// GET /api/authors/:id - Buscar autor por ID
router.get('/:id', authorController.getAuthorById);

// PUT /api/authors/:id - Atualizar autor
router.put('/:id', authorController.updateAuthor);

// DELETE /api/authors/:id - Deletar autor
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;