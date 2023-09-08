import Cart from '../models/cart.model';

export const addBookToCart = async (req) =>{

    const getUserCart = await Cart.find({userId: req.body.user_id})
    return getUserCart;
}