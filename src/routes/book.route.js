import express from 'express';
import * as booksController from '../controllers/books.controller'
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// to get books
router.get('', userAuth, booksController.getAllBooks);

// to get sorted books in ascending
router.get('/sortAsc', userAuth, booksController.getSortedAscBooks);

// to get sorted books in ascending
router.get('/search/:name', userAuth, booksController.searchBook);

export default router;