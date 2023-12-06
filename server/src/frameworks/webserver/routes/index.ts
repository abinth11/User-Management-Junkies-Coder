import { Application } from 'express';
import userRouter from './users';

const routes = (app: Application) => {
  
    app.use('/api/v1/users',userRouter())

};

export default routes;