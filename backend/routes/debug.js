const express = require('express');
const { storage } = require('../data/storage');

const router = express.Router();

router.get('/books', (req, res) => {
  res.json({
    success: true,
    data: storage.books
  });
});

module.exports = router;

