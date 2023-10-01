import express from 'express';
import * as booksController from '../controllers/books.controller'
import { userAuth } from '../middlewares/auth.middleware';
import { redisData } from '../middlewares/redis.middleware';

const router = express.Router();

// to get books
router.get('', userAuth, redisData, booksController.getAllBooks);

// to get sorted books in ascending
router.get('/search', userAuth, booksController.searchBook);

// to get books greater than price
router.get('/ghp',userAuth, booksController.getHigherPriceBooks);

// to get sorted books in ascending
router.get('/:sort', userAuth, booksController.getSortedBooks);

export default router;