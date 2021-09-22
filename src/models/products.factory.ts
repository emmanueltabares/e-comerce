import path from 'path';
import { ProductosFSDAO } from './DAOs/ProductsFSDAO';
import { ProductosMemDAO } from './DAOs/ProductsMemDAO';
import { ProductAtlasDAO } from './DAOs/ProductsMongoDAO';
import { ProductsMYSQLDAO } from './DAOs/ProductsMYSQLDAO';
import { ProductsFirebaseDAO } from './DAOs/ProductsFirebase';

export enum TipoPersistencia {
    memoria = 'MEM',
    FileSystem = 'FS',
    MYSQL = 'MYSQL',
    SQLITE3 = 'SQLITE3',
    LocalMongo = 'LOCAL-MONGO',
    MongoAtlas = 'MONGO-ATLAS',
    Firebase = 'FIREBASE',
}

export class FactoryDAO {
    static get(tipo: TipoPersistencia) {
      switch (tipo) {
        case TipoPersistencia.FileSystem:
          console.log('RETORNANDO INSTANCIA CLASE FS');
          const filePath = path.resolve(__dirname, './DAOs/products.json');
          console.log(filePath);
          return new ProductosFSDAO(filePath);

        case TipoPersistencia.LocalMongo:
          console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
          return new ProductAtlasDAO(true)
        
        case TipoPersistencia.MongoAtlas:
          console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
          return new ProductAtlasDAO();
        
        case TipoPersistencia.Firebase:
          console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
          return new ProductsFirebaseDAO();

        case TipoPersistencia.MYSQL:
          console.log('RETORNANDO INSTANCIA CLASE MYSQL');
          return new ProductsMYSQLDAO('mysql');

        case TipoPersistencia.SQLITE3:
          console.log('RETORNANDO INSTANCIA CLASE SQLITE3');
          return new ProductsMYSQLDAO('sqlite');

        default:
          console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
          return new ProductosMemDAO();
      }
    }
  }