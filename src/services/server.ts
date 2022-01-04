import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import { Logger } from './logger';
import config from '../config/config';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { OPTIONS } from '../modules/swaggerOptions';
import socketIO from 'socket.io';

const app = express();
const PUBLIC_FOLDER_PATH = path.resolve(__dirname, '../../public');

const SPECS = swaggerJsDoc(OPTIONS)
app.use('/api-docs', swaggerUI.serve , swaggerUI.setup(SPECS))

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_SRV,
      }),
    
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: config.SESSION_COOKIE_TIMEOUT_MIN * 60 * 1000,
      }
  })
) 

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(PUBLIC_FOLDER_PATH));

app.set('view engine', 'pug');
const viewsFolderPath = path.resolve(__dirname, '../views');
app.set('views', viewsFolderPath)

app.use('/api', apiRouter);

const errorHandler: ErrorRequestHandler = (err, req, res) => {
    Logger.error(`HUBO UN ERROR ${err.message}`);  
  };

app.use(errorHandler);

const MyServer = new http.Server(app);

export default MyServer;