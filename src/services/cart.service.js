import Cart from '../models/cart.model';
import Book from '../models/book.model';

export const addBookToCart = async (req) =>{
    const bookId = req.params.bookId;
    const user_id = req.body.user_id;

    const getBook = await Book.findOne({_id: bookId})
    if(getBook == null || getBook.quantity <= 0 ){ throw new Error("Book not availble or invalid book id") }

    const getUserCart = await Cart.findOne({userId: user_id})

    let totalCartPrice;

    if (getUserCart == null){
        const books = [{
            productId: getBook._id,
            description: getBook.description,
            bookImage: getBook.bookImage, 
            bookName: getBook.bookName, 
            Author: getBook.Author, 
            price: getBook.price,
            totalPrice: getBook.price
        }]
        const userNewCart = {userId: user_id, books:books, totalCartPrice: getBook.price}
        const createNewCart = await Cart.create(userNewCart)
        return createNewCart;
    }else{
        const cartBooks = getUserCart.books;
        let bookIndex = 0;
        let isPresent = false;

        for(let i = 0;i<cartBooks.length;i++){
            if(bookId == cartBooks[i].productId){
                bookIndex = i;
                isPresent = true;
            }
        }
        if(isPresent == true){
            cartBooks[bookIndex].totalPrice = cartBooks[bookIndex].totalPrice + getBook.price
            cartBooks[bookIndex].quantity = cartBooks[bookIndex].quantity + 1;
            totalCartPrice = getUserCart.totalCartPrice +  cartBooks[bookIndex].price;

            const updateCart = await Cart.findByIdAndUpdate({_id:getUserCart._id}, { books: cartBooks, totalCartPrice: totalCartPrice}, { new: true })
            return updateCart;
        }else{
            const newBook = {
                productId: getBook._id, 
                description: getBook.description, 
                bookImage: getBook.bookImage, 
                bookName: getBook.bookName, 
                Author: getBook.Author, 
                price: getBook.price,
                totalPrice: getBook.price
            }
            cartBooks.push(newBook)
            totalCartPrice = getUserCart.totalCartPrice + getBook.price;
            const addNewBookToCart = await Cart.findByIdAndUpdate({_id:getUserCart._id}, {books: cartBooks,totalCartPrice: totalCartPrice}, { new: true })
            return addNewBookToCart;
        }
    }
}