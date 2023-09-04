import HttpStatus from 'http-status-codes';
import * as books from '../services/book.service'

export const getAllBooks = async (req, res, next) => {
    try {
      const data = await books.getAllBooks(req);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Notes fetched successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };