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

const addLink = ({ source, referrer, weight }) =>
  new Promise(async (resolve, reject) => {
    const sourceMovie = await selectMovieByName(source)
    const referrerMovie = await selectMovieByName(referrer)
    if (sourceMovie[0].id && referrerMovie[0].id) {
      const result = await query(`
        INSERT INTO links (
          "source",
          "referrer",
          "weight"
        ) VALUES (
          ${sourceMovie[0].id},
          ${referrerMovie[0].id},
          ${weight}
        )
      `)
      return resolve(result)
    } else {
      return reject(
        new Error('Please make sure both movies exist in the database.')
      )
    }
  })

module.exports = {
  selectMovies: () => query('SELECT * FROM movies'),
  insertMovie,
  selectMovieByName,
  selectMovieByNameAndYear,
  selectLinks: () => query('SELECT * FROM links'),
  addLink
}