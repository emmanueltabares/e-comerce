"use strict";
// Update with your config settings.
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexConfig = void 0;
module.exports = {
    development: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "productos",
        },
        migrations: { directory: __dirname + "/db/migrations" },
        seeds: { directory: __dirname + "/db/seeds" },
    },
};
exports.knexConfig = module.exports;
