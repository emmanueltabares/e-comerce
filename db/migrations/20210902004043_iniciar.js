exports.up = function (knex) {
  return knex.schema
    .createTable("productos", (productosTable) => {
      productosTable.increments();
      productosTable.string("title").notNullable();
      productosTable.string('description').notNullable();
      productosTable.decimal('price', 4, 2).notNullable();
      productosTable.integer('stock').notNullable();
      productosTable.timestamp("createdAt").defaultTo(knex.fn.now());
    })
};
exports.down = function (knex) {
  return knex.schema.dropTable("productos");
};
