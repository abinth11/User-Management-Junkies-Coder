import express, { Application, NextFunction } from 'express';
import connectToMongoDb from './frameworks/databases/mongodb/connection';
import http from 'http';
import serverConfig from './frameworks/webserver/server';
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';
import colors from 'colors';
import errorHandlingMiddleware from './frameworks/webserver/middlewares/error-handler';

import AppError from './utils/app-error';
import swaggerDocs from './adapters/docs/config';
import ENVIRONMENT_VARIABLES from './config';
 
colors?.enable();

const app: Application = express();
const server = http.createServer(app);



//* connecting mongoDb 
connectToMongoDb(); 

//* express config connection
expressConfig(app);

//* routes for each endpoint
routes(app);

//* swagger docs
swaggerDocs(app,ENVIRONMENT_VARIABLES.PORT);


//* handles server side errors
app.use(errorHandlingMiddleware);

//* catch 404 and forward to error handler
app.all('*', (req, res, next: NextFunction) => {
  next(new AppError('Not found', 404));
});

//* starting the server with server config
serverConfig(server).startServer();

