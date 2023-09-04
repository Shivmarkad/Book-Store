import Book from "../models/book.model";

export const getAllBooks = async (req) => {
    const book = await Book.find();
    if (book) {
    
      return book;
    };
    throw new Error("Unable to find");
  };