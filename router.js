const express = require('express');
const router = express.Router();

const books = require ('./booksController')

router.get('/books', books.index)
router.get('/book/:id', books.show)
router.delete('/book/:id', books.delete)
router.put('/book/:id', books.update)

router.post('/book/create', books.create)

module.exports = router;