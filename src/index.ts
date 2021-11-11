import Server from './services/server';
import Config from './config/config'
import { connectToDB } from './models/db';
import { Logger } from './services/logger';

const PORT = Config.PORT;

connectToDB().then(() => {
    Logger.info('Connect to Database!');
    const server = Server.listen(PORT, () => {
      Logger.info(`Server up in port ${PORT}`);
    });
  
    server.on('error', (error) => Logger.error(`Server error: ${error}`));
  });
