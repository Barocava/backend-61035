import { createResponse } from "../utils.js"
import logger from "../utils/logger.js"

export const errorHandler = (error, req, res, next) => {
    logger.error( `error ${error}`) 
    const status = error.status || 500
    createResponse(res, status, error)
    // res.status(status).send(error.message)
}