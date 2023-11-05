import Cart from '../models/cart.model';
import Book from '../models/book.model';

export const addBookToCart = async (user_id, bookId) => {
    const getBook = await Book.findOne({ _id: bookId })
    if (getBook == null || getBook.quantity <= 0) {
        throw new Error("Book not available or invalid book id")
    }
    const getUserCart = await getCartByUserId(user_id)
    let totalCartPrice;
    
    const newBook = {
        productId: getBook._id,
        description: getBook.description,
        bookImage: getBook.bookImage,
        bookName: getBook.bookName,
        Author: getBook.Author,
        price: getBook.price,
        totalPrice: getBook.price
    }
    if (getUserCart == null) {
        const createNewCart = await Cart.create({
            userId: user_id,
            books: [newBook],
            totalCartPrice: getBook.price
        })
        return createNewCart;
    }
    const isBookPresent = getUserCart.books.filter(book => book.productId == bookId);
    if (isBookPresent.length > 0) {
        getUserCart.books = getUserCart.books.map(item => {
            if (item.productId == bookId) {
                item.totalPrice = item.totalPrice + getBook.price;
                item.quantity += 1
                totalCartPrice = getUserCart.totalCartPrice + item.price;
            }
            return item;
        })
    } else {
        getUserCart.books.push(newBook)
        totalCartPrice = getUserCart.totalCartPrice + getBook.price;
    }
    const addBookToCart = await Cart.findByIdAndUpdate({ _id: getUserCart._id },
        { books: getUserCart.books, totalCartPrice: totalCartPrice },
        { new: true })
    return addBookToCart;
}

export const removeBookFromCart = async (user_id, bookId) => {

    const getUserCart = await getCartByUserId(user_id)
    if (getUserCart == null) { throw new Error("Cart not found or cart is empty") }

    let books = getUserCart.books
    let totalCartPrice = getUserCart.totalCartPrice;
    const isBookPresent = getUserCart.books.filter(item => item.productId == bookId)

    if (isBookPresent.length > 0) {
        if (isBookPresent[0].quantity == 1) {
            totalCartPrice -= books[0].price
            books = books.filter(item => item.productId != bookId)
        }else{
            books = books.map(item => {
                if(item.productId == bookId){
                    item.quantity -= 1
                    item.totalPrice -= item.price
                    totalCartPrice -= item.price
                }
                return item
            })
        }
        const updateCart = await Cart.findByIdAndUpdate({ _id: getUserCart._id }, 
            { books: books, totalCartPrice: totalCartPrice }, 
            { new: true })
        return updateCart;
    }
    throw new Error("Book not found in the cart")
}

export const purchaseOrders = async (user_id) => {
    const getUserCart = await getCartByUserId(user_id)
    if (getUserCart == null) {
        throw new Error("Cart not found or there is no book in the cart") 
    }

    let purchaseStatus;
    getUserCart.isPurchased ? purchaseStatus = false : purchaseStatus = true;
    const purchaseCartBooks = await Cart.findByIdAndUpdate({ _id: getUserCart._id },
        { isPurchased: purchaseStatus },
        { new: true });
    if (purchaseCartBooks) { return purchaseCartBooks }
    throw new Error("Unable to purchase server error")
}

export const getCartByUserId = async (user_id) => {
    const getUserCart = await Cart.findOne({userId: user_id})
    return getUserCart;
}