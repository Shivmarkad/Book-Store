import express from 'express';
import * as booksController from '../controllers/books.controller'
import { userAuth } from '../middlewares/auth.middleware';
import { redisData } from '../middlewares/redis.middleware';

const router = express.Router();

// to get books
router.get('', userAuth, redisData, booksController.getAllBooks);

// to get sorted books in ascending
router.post('/search', booksController.searchBook);

// to get books greater than price
router.post('/ghp/:price', booksController.getHigherPriceBooks);

// to get sorted books in ascending
router.get('/:sort', booksController.getSortedBooks);

export default router;