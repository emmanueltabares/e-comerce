import { CartsAtlasDAO } from '../carts/DAOs/mongoDAO';
import path from 'path';
import { Logger } from '../../services/logger';

export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MongoAtlas = 'MONGO-ATLAS',
}

export class CartFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        Logger.info('Retornando Instancia Cart Mongo Atlas');
        return new CartsAtlasDAO();

      default:
        Logger.info('Retornando Instancia Cart Default');
        return new CartsAtlasDAO();
    }
  }
}