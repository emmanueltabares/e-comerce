import { UsersMongoDAO } from '../users/DAOs/mongoDAO';
import { Logger } from '../../services/logger';

export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
  Firebase = 'FIREBASE',
}

export class UserFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        Logger.info('Retornando Instancia Users Mongo Atlas');
        return new UsersMongoDAO();

      default:
        Logger.info('Retornando Instancia Users Default');
        return new UsersMongoDAO();
    }
  }
}