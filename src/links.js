const { 
  selectMovieByName,
  insertLink
} = require('./db/query')

const addLink = async ({ source, referrer, weight }) => {
  const [sourceMovie] = await selectMovieByName(source)
  const [referrerMovie] = await selectMovieByName(referrer)

  if (!sourceMovie || !sourceMovie.id) {
    return {
      status: 400,
      data: `'${source}' not found in the movie database.`
    }
  }
  if (!referrerMovie || !referrerMovie.id) {
    return {
      status: 400,
      data: `'${referrer}' not found in the movie database.`
    }
  }

  await insertLink(sourceMovie.id, referrerMovie.id, weight)
  return {
    status: 201,
    data: {
      source: sourceMovie.id,
      referrer: referrerMovie.id, 
      weight
    }
  }
}

module.exports = {
  addLink
}