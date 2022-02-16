export const OPTIONS = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Proyecto de Emmanuel Tabares con Swagger',
        version: '0.0.1',
        description:
          'This is a simple CRUD API application made with Express and documented with Swagger',
        license: {
          name: 'MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
          name: 'Emmanuel Tabares',
          url: 'https://github.com/emmanueltabares',
          email: 'manutabares20@gmail.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:8081',
          description: 'Development server',
        },
      ],
    },
    apis: ['./src/routes/*'],
  };