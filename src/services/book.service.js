import Book from "../models/book.model";
import { client } from '../config/redis';

export const getAllBooks = async (req) => {

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 4;
  let skip = (page - 1)* limit;
  
  const book = await Book.find();

  if (book) {
    const books = JSON.stringify(book)
    await client.set(req.body.user_id, books)
    await client.expire(req.body.user_id,10)
    return book.slice(skip,skip + limit);
  };
  throw new Error("Unable to find");
};


export const getSortedBooks = async (sort) => {
  let books;
  if(sort == 'asc'){
    books = await Book.find().sort({ price: 1 });
  }else if(sort == 'desc'){
    books = await Book.find().sort({ price: -1 })
  }
  if (books) { return books;  };
  throw new Error("Unable to find");
};


export const searchBook = async (req) => {

  var reg = new RegExp(req.body.string, 'i')

  const books = await Book.find({bookName: reg})
  if(books)  return books;

  throw new Error("books note found");

};
