const {
  selectMovieByNameAndYear,
  insertMovie
} = require('./db/query')

const addMovie = async ({ name, year }) => {
  const rows = await selectMovieByNameAndYear({ name, year })
  if (rows.length > 0) {
    console.log(`Movie already exists: ${name} (${year})`)
    return {
      status: 200,
      data: rows[0]
    }
  } else {
    console.log(`Movie added: ${name} (${year})`)
    await insertMovie({ name, year })
    return {
      status: 201,
      data: { name, year }
    }
  }
}

module.exports = {
  addMovie
}