import Cart from '../models/cart.model';
import Book from '../models/book.model';

export const addBookToCart = async (user_id, bookId) =>{

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
        const books = getUserCart.books;
        let bookIndex = 0;
        let isPresent = false;

        for(let i = 0;i<books.length;i++){
            if(bookId == books[i].productId){
                bookIndex = i;
                isPresent = true;
            }
        }
        if(isPresent == true){
            books[bookIndex].totalPrice = books[bookIndex].totalPrice + getBook.price
            books[bookIndex].quantity = books[bookIndex].quantity + 1;
            totalCartPrice = getUserCart.totalCartPrice +  books[bookIndex].price;

            const updateCart = await Cart.findByIdAndUpdate({_id:getUserCart._id}, { books: books, totalCartPrice: totalCartPrice}, { new: true })
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
            books.push(newBook)
            totalCartPrice = getUserCart.totalCartPrice + getBook.price;
            const addNewBookToCart = await Cart.findByIdAndUpdate({_id:getUserCart._id}, {books: books,totalCartPrice: totalCartPrice}, { new: true })
            return addNewBookToCart;
        }
    }
}

export const deleteBookFromCart = async(user_id, bookId) => {

    const getUserCart = await Cart.findOne({userId: user_id})

    if(getUserCart == null){ throw new Error("Cart not found or cart is empty") }

    const books = getUserCart.books

    let totalCartPrice;
    let bookIndex = 0;
    let isPresent = false;

    for(let i = 0;i<books.length;i++){
        if(bookId == books[i].productId){
            bookIndex = i;
            isPresent = true;
        }
    }

    if(isPresent){
        if(books[bookIndex].quantity == 1){
            totalCartPrice = getUserCart.totalCartPrice - books[bookIndex].price
            books.splice(bookIndex,1)
            const updateCart = await Cart.findByIdAndUpdate({_id:getUserCart._id}, { books: books, totalCartPrice: totalCartPrice}, { new: true })
            return updateCart;
        }

        books[bookIndex].quantity -= 1;
        books[bookIndex].totalPrice -= books[bookIndex].price
        totalCartPrice = getUserCart.totalCartPrice - books[bookIndex].price
        const updateCart = await Cart.findByIdAndUpdate({_id:getUserCart._id}, { books: books, totalCartPrice: totalCartPrice}, { new: true })
        return updateCart;
    }
    throw new Error("Book not found in the cart")
}