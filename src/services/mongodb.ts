import Config from '../config/config';
import mongoose, { Connection } from 'mongoose';

mongoose.Promise = global.Promise;

export class MongoDB {
    private instance: number;
    private url: string;
    private connection?: Connection;

    constructor() {
        this.url = Config.MONGO_SRV;
        this.instance = 0;
    }

    getConnection() {
        if(!this.connection) this.connection = mongoose.createConnection(this.url, { 
                useUnifiedTopology: true,
                useNewUrlParser: true,
            });
        return this.connection;
    }
}