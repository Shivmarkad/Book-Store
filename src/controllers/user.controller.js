import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import { userlogger } from '../config/logger'

/**
 * Controller to signUp
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const signUp = async (req, res, next) => {
  try {
    const data = await UserService.signUp(req.body);

    userlogger.info(`New user resistered: ${data._id}`)
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Registered successfully'
    });
  } catch (error) {
    userlogger.error(`Error while user resistration: ${error}`)
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

export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body.password, req.body.user_id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: "password updated successfully"
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
}


export const forgotPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgotPassword(req.body.email);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: "token generated !!"
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
}