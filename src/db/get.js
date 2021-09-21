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

module.exports = {
  getAll: () => query('SELECT * FROM movies')
}