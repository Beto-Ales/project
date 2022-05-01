const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method', request.method)
    logger.info('Path', request.path)
    logger.info('Body', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
// this should be done from the frontend
// const calcSpecialHours = (request, response, next) => {
//     request.body.grid[0].row[0].totalNormal = request.body.grid[0].row[0].startWork * 2
//     request.body.grid[0].row[0].totalSpecial = request.body.grid[0].row[0].endWork * 3
//     console.log('startWork', request.body.grid[0].row[0].startWork, 'totalNormal', request.body.grid[0].row[0].totalNormal, 'totalSpecial', request.body.grid[0].row[0].totalSpecial);
//     next()
// }

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    // calcSpecialHours
}