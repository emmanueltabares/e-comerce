import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import { Logger } from './logger';
import config from '../config/config';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';

const app = express();
const PUBLIC_FOLDER_PATH = path.resolve(__dirname, '../../public');

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

app.get('/', (req, res) => {
    res.json({
        msg: "Bienvenido!"
    });
})

app.set('view engine', 'pug');
const viewsFolderPath = path.resolve(__dirname, '../views');
app.set('views', viewsFolderPath)

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

const errorHandler: ErrorRequestHandler = (err, req, res) => {
    Logger.error(`HUBO UN ERROR ${err.message}`);
    /*  res.status(500).json({
      err: err.message,
    }); */  
  };

app.use(errorHandler);

const server = new http.Server(app);

export default server;

