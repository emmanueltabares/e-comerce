import { OrderMongoDAO } from '../orders/DAOs/mongoDAO';
import { Logger } from '../../services/logger';

export enum TipoPersistencia {
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class OrderFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        Logger.info('Retornando Instancia Orders Mongo Atlas');
        return new OrderMongoDAO();

      default:
        Logger.info('Retornando Instancia Ordens Default');
        return new OrderMongoDAO();
    }
  }
}