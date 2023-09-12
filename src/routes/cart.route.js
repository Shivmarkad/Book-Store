import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as cartController from '../controllers/carts.controller';

const router = express.Router();

//route to add book in the cart
router.post('/:bookId',userAuth,cartController.addBookToCart)

//route to purchase book from the cart
router.put('',userAuth,cartController.purchaseOrders)

//route to delet book from the cart
router.put('/:bookId',userAuth,cartController.deleteBookFromCart)

export default router;