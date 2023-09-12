import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as wishlistController from '../controllers/wishlist.controller';
const router = express.Router();

router.post('/:bookId',userAuth, wishlistController.addBookToWishList);

export default router;