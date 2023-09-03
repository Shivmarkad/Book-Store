import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to signUp
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const signUp = async (req, res, next) => {
  try {
    const data = await UserService.signUp(req.body);

    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Registered successfully'
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const data = await UserService.signIn(req.body);

    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'signed In successfully'
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};


