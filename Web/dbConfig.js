const knex = require('knex')
const dbMandat2 = knex({
    client: 'sqlite3',
    connection: {
      filename:"mandat2.sqlite3"
      },
      useNullAsDefault: true
});

module.exports = dbMandat2
