import HttpStatus from 'http-status-codes';
import * as cart from '../services/wishlist.service';

export const addBookToWishList = async (req,res,next)=>{
    try{
        const data = await cart.addBookToWishList(req.body.user_id,req.params.bookId);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:"Book added to wishlist Successfully !"
        })
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message:`Error while adding book in wishlist: ${error}`
        })
    }
}