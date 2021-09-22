const db = require('./index')

const query = sql =>
  new Promise((resolve, reject) => {
    db.all(sql, function(err, rows) {
      if (err) {
        return reject(err)
      } else {
        return resolve(rows)
      }
    }) 
  })

const addMovie = ({ name, year }) => 
  query(`
    INSERT INTO movies (
      "name",
      "year"
    ) VALUES (
      "${name}",
      ${year}
    )
  `)

const getMovieByNameAndYear = ({ name, year }) => query(`
  SELECT * FROM movies
  WHERE
    name="${name}" AND year=${year}
`)

const getMovieByName = (name) => query(`
  SELECT * FROM movies
  WHERE name="${name}"
`)

const addLink = ({ source, referrer, weight }) =>
  new Promise(async (resolve, reject) => {
    const sourceMovie = await getMovieByName(source)
    const referrerMovie = await getMovieByName(referrer)
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
  getMovies: () => query('SELECT * FROM movies'),
  addMovie,
  getMovieByName,
  getMovieByNameAndYear,
  getLinks: () => query('SELECT * FROM links'),
  addLink
}