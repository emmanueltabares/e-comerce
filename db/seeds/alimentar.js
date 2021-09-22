
exports.seed = function (knex) {

  const initProducts = [
    {
      title: 'cartuchera',
      description: 'Linda Cartuchera',
      stock: 20,
      price: '10.5',
    },
    {
      title: 'pendrive',
      description: 'pendrive 32gb',
      stock: 20,
      price: '99.4',
    },
  ];

return knex('productos').del()
   .then(() => knex('productos').insert(initProducts));

}; 