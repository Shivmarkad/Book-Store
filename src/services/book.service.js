import Book from "../models/book.model";

export const getAllBooks = async (req) => {

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 4;
  let skip = (page - 1)* limit;
  
  const book = await Book.find().skip(skip).limit(limit);

  if (book) {    return book;  };
  throw new Error("Unable to find");
};


export const getSortedBooks = async (req) => {
  let books;
  if(req.body.sortPara == 'Ascending'){
    books = await Book.find().sort({ price: 1 });
  }else if(req.body.sortPara == 'Descending'){
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
