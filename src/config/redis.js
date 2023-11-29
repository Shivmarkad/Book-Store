import { createClient } from 'redis';
import logger from '../config/logger';
import dotenv from 'dotenv';
dotenv.config();
export const client = createClient({url: process.env.REDIS_URL});

const redis = async () => {
    try {
        await client.connect();
        logger.log('info',"successfully connect to the redis client")

    } catch (error) {
        logger.log('error',`redis connection failed , ${error}`);
    }
}

export default redis;
