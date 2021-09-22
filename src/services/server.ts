import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';

const app = express();

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(express.json());
app.use('/api', apiRouter);

//HandlerError previene que no se rompa el server
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`HUBO UN ERROR ${err}`);
    res.status(500).json({
      err: err.message,
    });
  };
  
  app.use(errorHandler);

const myServer = new http.Server(app);

export default myServer;