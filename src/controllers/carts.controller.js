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

export const removeBookFromCart = async (req, res, next) =>{
    try{
        const data = await cart.removeBookFromCart(req.body.user_id, req.params.bookId);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:"Book removed from cart successfully"
        })
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `error while deleting book from the cart ${error}`
        })
    }
}

export const purchaseOrders = async (req, res, next) => {
    try{
        const data = await cart.purchaseOrders(req.body.user_id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:"Books purchased successfully"
        })
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `error while purchasing books from the cart ${error}`
        })
    }
}

export const getCart = async (req, res, next) => {
    try{
        const data = await cart.getCartByUserId(req.body.user_id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:"Cart fetched successfully"
        })
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `error while fetching cart ${error}`
        })
    }
}