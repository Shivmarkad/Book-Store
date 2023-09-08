import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as cartController from '../controllers/carts.controller';

const router = express.Router();

router.post('',userAuth,cartController.addBookToCart)

export default router;