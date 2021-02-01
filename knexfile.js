const pg = require("pg")

const localConnection = "postgresql://localhost/anywhere-fitness-tt42"

let connection

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
  connection = process.env.DATABASE
} else {
  connection = localConnection
}

const sharedConfig = {
  client: "pg",
  connection,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" }
}

module.exports = {
  development: { ...sharedConfig },

  production: {
    ...sharedConfig,
    pool: { min: 2, max: 10 }
  }
}
