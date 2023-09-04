import express from 'express';
import * as booksController from '../controllers/books.controller'
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// to get note
router.get('', userAuth, booksController.getAllBooks);

export default router;