import HttpStatus from 'http-status-codes';
import * as cart from '../services/cart.service';

export const addBookToCart = async (req, res, next) =>{
    try{
        const data = await cart.addBookToCart(req);
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