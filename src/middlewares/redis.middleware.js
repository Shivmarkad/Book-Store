import HttpStatus from 'http-status-codes';
import {client} from '../config/redis';

export const redisData = async (req, res, next) => {
    try {
   
      const redisData = await client.get(req.body.user_id);

        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 4;
        let skip = (page - 1)* limit;

      if (redisData !== null){
        const data = JSON.parse(redisData);
        const paginatedData = data.slice(skip,skip + limit)

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: paginatedData,
            message: `On page ${page} Total ${limit} Books fetched from redis successfully`
          });
      }else{
          next();
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
      code : HttpStatus.BAD_REQUEST,
     message: `error occured while getting data from redis ${error}`
    });
    }
  };