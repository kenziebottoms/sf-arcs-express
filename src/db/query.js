const db = require('./index')

const query = sql => {
  console.log(`SQL: \`${sql}\``) 
  return new Promise((resolve, reject) => {
    db.all(sql, function(err, rows) {
      if (err) {
        return reject(err)
      } else {
        console.log(`Results: ${JSON.stringify(rows)}`)
        return resolve(rows)
      }
    }) 
  })
}

const insertMovie = ({ name, year }) => 
  query(`
    INSERT INTO movies (
      "name",
      "year"
    ) VALUES (
      "${name}",
      ${year}
    )
  `)

const selectMovieByNameAndYear = ({ name, year }) => query(`
  SELECT * FROM movies
  WHERE
    name="${name}" AND year=${year}
`)

const selectMovieByName = (name) => query(`
  SELECT * FROM movies
  WHERE name="${name}"
`)

const insertLink = (sourceId, referrerId, weight) => query(`
  INSERT INTO links (
    "source",
    "referrer",
    "weight"
  ) VALUES (
    ${sourceId},
    ${referrerId},
    ${weight}
  )
`)

module.exports = {
  selectMovies: () => query('SELECT * FROM movies'),
  insertMovie,
  selectMovieByName,
  selectMovieByNameAndYear,
  selectLinks: () => query('SELECT * FROM links'),
  insertLink
}