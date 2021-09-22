import knex, { Knex } from 'knex';
import knexConfig from '../../../knexfile';
import { newProductI, ProductI } from '../products.interface';

export class ProductsMYSQLDAO {

  private connection: Knex;

  constructor(dbType: 'mysql' | 'sqlite') {

    const environment =
      dbType === 'mysql'
        ? 'development'
        : 'development2';

    console.log(`SETTING ${environment} DB`);
    const options = knexConfig[environment];
    this.connection = knex(options);
  }

  init() {
    
    this.connection.schema.hasTable('productos').then((exists: any) => {
      if (exists) return;
      console.log('Creamos la tabla productos!');

      return this.connection.schema.createTable(
        'productos',
        (productosTable) => {
          productosTable.increments();
          productosTable.string('title').notNullable();
          productosTable.string('description').notNullable();
          productosTable.integer('stock').notNullable();
          productosTable.decimal('price', 4, 2);
          productosTable.string('thumbnail');
          productosTable.timestamp('createdAt').defaultTo(new Date());
        }
      );
    });
  }

  async get(id?: string): Promise<ProductI> {

      if (id) {
        const producto = await this.connection('productos').where(
          'id',
          Number(id)
        );
        return producto[0];
      }
      return this.connection('productos');
  }

  async add(producto: newProductI): Promise<newProductI> {
      
    const newProductId = await this.connection('productos').insert(producto);
    const newProduct = this.get(newProductId[0] as unknown as string);
    
    return newProduct;
}

  async update(id: string, producto: ProductI): Promise<ProductI> {
    
      await this.connection('productos')
        .where('id', Number(id))
        .update(producto);
      const productUpdated = await this.get(id);

      return productUpdated;
  }

  async delete(id: string): Promise<any> {

      const productDeleted = await this.connection('productos')
        .where('id', Number(id))
        .del();

        return productDeleted;
  }
}
