// const pg = require("pg")

// const localConnection = "postgresql://localhost/anywhere-fitness-tt42"

// let connection

// if (process.env.DATABASE_URL) {
//   pg.defaults.ssl = { rejectUnauthorized: false }
//   connection = process.env.DATABASE
// } else {
//   connection = localConnection
// }

// const sharedConfig = {
//   client: "pg",
//   connection,
//   migrations: { directory: "./data/migrations" },
//   seeds: { directory: "./data/seeds" }
// }

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/data.db3'
    },
    useNullAsDefault: true,
    migrations: { directory: "./data/migrations"},
    seeds: { directory: "./data/seeds"},
    pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
