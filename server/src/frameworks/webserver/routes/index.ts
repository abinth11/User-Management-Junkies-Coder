import { Application } from 'express';
import { RedisClient } from '../../../app';
import userRouter from './users';

const routes = (app: Application, redisClient: RedisClient) => {
  
    app.use('/api/v1/users',userRouter())

};

export default routes;