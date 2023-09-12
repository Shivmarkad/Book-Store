import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as wishlistController from '../controllers/wishlist.controller';
const router = express.Router();

//add book to wishlist
router.post('/:bookId',userAuth, wishlistController.addBookToWishList);

//remove book from wishlist
router.put('/:bookId',userAuth, wishlistController.removeBookFromWishList);

export default router;