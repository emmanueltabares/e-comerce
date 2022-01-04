/* import { ProductosMemDAO } from './DAOs/memory';
import { ProductosFSDAO } from './DAOs/fs'; */
import { ProductsMongoDAO } from '../products/DAOs/mongoDAO';
import { Logger } from '../../services/logger';
import path from 'path';
export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MongoAtlas = 'MONGO-ATLAS',
}

export class NoticiasFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        Logger.info('Retornando Instancia Products FS');
        const filePath = path.resolve(__dirname, './DAOs/products.json');
        /* return new ProductosFSDAO(filePath); */

      case TipoPersistencia.MongoAtlas:
        Logger.info('Retornando Instancia Products Mongo Atlas');
        return new ProductsMongoDAO();

      default:
        Logger.info('Retornando Instancia Products Default');
        return new ProductsMongoDAO();
    }
  }
}