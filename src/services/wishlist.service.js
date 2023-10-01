import Book from '../models/book.model';
import Wishlist from '../models/wishlist.model'

export const addBookToWishList = async (userId, bookId) => {
    const getBook = await Book.findOne({ _id: bookId })
    if (getBook == null) { throw new Error("invalid book id") }
    const newBook = {
        productId: getBook._id,
        description: getBook.description,
        bookName: getBook.bookName,
        bookImage: getBook.bookImage,
        author: getBook.author,
        price: getBook.price
    }
    const userWishList = await Wishlist.findOne({ userId: userId });
    if (userWishList == null) {
        const newUserWishList = { userId: userId, books: [newBook] }
        const createdWishlist = await Wishlist.create(newUserWishList);
        return createdWishlist;
    }
    const books = userWishList.books;
    for (let i in books) {
        if (books[i].productId == bookId) {
            throw new Error("Book is already in the wishlist !!")
        }
    }
    books.push(newBook)
    const newBookToWishlist = await Wishlist.findByIdAndUpdate({ _id: userWishList._id }, { books: books }, { new: true })
    return newBookToWishlist;
}

export const removeBookFromWishList = async (userId, bookId)=>{
    const userWishList = await Wishlist.findOne({userId: userId});
    if(userWishList == null){ throw new Error("Wishlist is Empty!!")}

    const books = userWishList.books;
    for (let i in books) {
        if (books[i].productId == bookId) {
            books.splice(i,1)
            const newBookToWishlist = await Wishlist.findByIdAndUpdate({ _id: userWishList._id }, { books: books }, { new: true })
            return newBookToWishlist;
        }
    }
    throw new Error("Book not in wishist !!")
}

export const getWishlist = async (user_id) => {
    const getUserWishlist = await Wishlist.findOne({ userId: user_id })
    if (getUserWishlist == null) {
        throw new Error("Wishlist not found or wishlist is empty") 
    }
    return getUserWishlist;
}