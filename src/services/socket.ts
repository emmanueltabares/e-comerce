import { Server } from 'socket.io';
import { Logger } from './logger';

const initWsServer = (server: any) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        Logger.info(`New connection: ${socket.id}`);
    });

    
}

export default initWsServer;