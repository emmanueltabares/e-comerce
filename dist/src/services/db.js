"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBService = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = require("../../knexfile");
const sqliteDB = (0, knex_1.default)({
    client: 'sqlite3',
    connection: { filename: './db.sqlite' }
});
const mysqlDB = (0, knex_1.default)({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'persistencia'
    },
    pool: { min: 0, max: 7 }
});
class DB {
    constructor() {
        const environment = process.env.NODE_ENV || 'development';
        console.log(`SETTING ${environment} DB`);
        const options = knexfile_1.knexConfig[environment];
        this.connection = (0, knex_1.default)(options);
    }
    init() {
        this.connection.schema.hasTable('productos').then((exists) => {
            if (exists)
                return;
            console.log('Creamos la tabla productos!');
            return this.connection.schema.createTable('productos', (productosTable) => {
                productosTable.increments();
                productosTable.string('title').notNullable();
                productosTable.string('description').notNullable();
                productosTable.integer('stock').notNullable();
                productosTable.decimal('price', 4, 2);
                productosTable.timestamp('createdAt').defaultTo(new Date());
            });
        });
    }
    getAll(tableName) {
        return this.connection(tableName);
    }
    get(tableName, id) {
        if (id)
            return this.connection(tableName).where('id', id);
        return this.connection(tableName);
    }
    create(tableName, data) {
        return this.connection(tableName).insert(data);
    }
    update(tableName, id, data) {
        return this.connection(tableName).where('id', id).update(data);
    }
    delete(tableName, id) {
        return this.connection(tableName).where('id', id).del();
    }
}
exports.DBService = new DB();
