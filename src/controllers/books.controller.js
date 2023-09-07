import HttpStatus from 'http-status-codes';
import * as books from '../services/book.service'

export const getAllBooks = async (req, res, next) => {
    try {
      const data = await books.getAllBooks(req);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Books fetched successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

export const getSortedBooks = async (req, res, next) => {
    try {
      const data = await books.getSortedBooks(req);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Sorted Books fetched successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

export const searchBook = async (req, res, next) => {
    try {
      const data = await books.searchBook(req);
      
      console.log("thi si the search",data)
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Searched Books fetched successfully'
      });



    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };