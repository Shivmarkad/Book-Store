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
    return book.slice(skip,skip + limit);
  };
  throw new Error("Unable to find");
};

export const getSortedBooks = async (req) => {
  let val = 1;
  let sort = req.query.sort || 'asc';
  if(sort == 'desc'){
    val = -1
  }
  const books = await Book.find().sort({ price: val })

  if (books) { return books;  };
  throw new Error("Unable to find sorted books");
};

export const searchBook = async (req) => {

  var reg = new RegExp(req.body.string, 'i')
  const books = await Book.find({bookName: reg})
  if(books)  return books;
  throw new Error("books note found");
};

export const getHigherPriceBooks = async (price) => {
  let getprice = parseInt(price)
  const books = await Book.aggregate([{ $match: { price: { $gte: getprice } } }]);
  if(books)  return books;
  throw new Error("books note found");
};
