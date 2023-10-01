import HttpStatus from 'http-status-codes';
import * as wishlist from '../services/wishlist.service';

export const addBookToWishList = async (req,res,next)=>{
    try{
        const data = await wishlist.addBookToWishList(req.body.user_id,req.params.bookId);
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

export const removeBookFromWishList = async (req,res,next)=>{
    try{
        const data = await wishlist.removeBookFromWishList(req.body.user_id,req.params.bookId);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:"Book removed from wishlist Successfully !"
        })
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message:`Error while removing the book from wishlist: ${error}`
        })
    }
}

export const getWishlist = async (req,res,next)=>{
    try{
        const data = await wishlist.getWishlist(req.body.user_id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:"wishlist fetched Successfully !"
        })
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message:`Error while fetching wishlist: ${error}`
        })
    }
}