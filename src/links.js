const { 
  selectMovieByName,
  insertLink,
  selectLinksByMovieIds
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

  const [existingLink] = await selectLinksByMovieIds(sourceMovie.id, referrerMovie.id)
  if (existingLink) {
    console.log(`Link already exists: ${source} => ${referrer} (${weight})`)
    return {
      status: 200,
      data: existingLink
    }
  }

  await insertLink(sourceMovie.id, referrerMovie.id, weight)
  console.log(`Link added: ${source} => ${referrer} (${weight})`)
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