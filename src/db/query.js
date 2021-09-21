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

module.exports = {
  getMovies: () => query('SELECT * FROM movies'),
  getLinks: () => query('SELECT * FROM links'),
  addMovie,
  getMovieByNameAndYear: ({ name, year }) => query(`
    SELECT * FROM movies
    WHERE
      name="${name}" AND year=${year}
  `)
}