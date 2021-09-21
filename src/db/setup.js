const db = require('./index')

db.serialize(function() {
  db.run(`
    DROP TABLE IF EXISTS movies
  `)
  db.run(`
    DROP TABLE IF EXISTS links
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS movies (
      "id" INTEGER PRIMARY KEY,
      "name" TEXT,
      "year" INTEGER
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS links (
      "source" INTEGER,
      "referrer" INTEGER,
      "weight" INTEGER
    )
  `)
})