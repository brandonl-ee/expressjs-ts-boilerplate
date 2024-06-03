import config from './constants/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler.middleware';
import mongoose from 'mongoose';
import passport from './middlewares/passport.middleware';

async function bootstrap() {
  const app = express();
  const FRONTEND_URL = config.FRONTEND_URL;
  const MONGO_URI: string = config.MONGO_URI as string;

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: FRONTEND_URL,
    }),
  );
  const port = config.PORT;

  app.use(passport.initialize());

  app.use('/api', routes);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  const connection = mongoose.connection;
  connection.on('connected', () => {
    console.log('Mongo Connection Connected');
  });
  connection.on('reconnected', () => {
    console.log('Mongo Connection Reconnected');
  });
  connection.on('disconnected', () => {
    console.log('Mongo Connection Disconnected');
    console.log('Trying to reconnect to Mongo ...');
    setTimeout(() => {
      mongoose.connect(MONGO_URI, {
        socketTimeoutMS: 3000,
        connectTimeoutMS: 3000,
      });
    }, 3000);
  });
  connection.on('close', () => {
    console.log('Mongo Connection Closed');
  });
  connection.on('error', (error: Error) => {
    console.log('Mongo Connection ERROR: ' + error);
  });

  const run = async () => {
    await mongoose.connect(MONGO_URI, {
      retryReads: true,
    });
  };
  run().catch((error) => console.error(error));
}

(async () => await bootstrap())();
