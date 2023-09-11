import HttpStatus from 'http-status-codes';
import * as cart from '../services/cart.service';

export const addBookToCart = async (req, res, next) =>{
    try{
        const data = await cart.addBookToCart(req.body.user_id, req.params.bookId);
        res.status(HttpStatus.CREATED).json({
            code:HttpStatus.CREATED,
            data:data,
            message:"Book Added to cart successfully"
        })
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `error while adding book in the cart ${error}`
        })
    }
}

export const deleteBookFromCart = async (req, res, next) =>{
    try{
        const data = await cart.deleteBookFromCart(req.body.user_id, req.params.bookId);
        res.status(HttpStatus.CREATED).json({
            code:HttpStatus.CREATED,
            data:data,
            message:"Book deleted from cart successfully"
        })
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `error while deleting book from the cart ${error}`
        })
    }
}