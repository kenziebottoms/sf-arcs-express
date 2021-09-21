const db = require('./index')

db.serialize(function() {
  db.run(`
    INSERT INTO movies (
      "name",
      "year"
    ) VALUES (
      "The Abyss",
      1989
    )
  `)
  db.run(`
    INSERT INTO movies (
      "name",
      "year"
    ) VALUES (
      "Life",
      2017
    )
  `)
  db.run(`
    INSERT INTO links (
      "source",
      "referrer",
      "weight"
    ) VALUES (
      "The Abyss",
      "Life",
      4
    )
  `)
})