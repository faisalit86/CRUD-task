/**
 * Generate resposne body.
 * @param {object} res 
 * @param {number} status 
 * @param {string} message 
 * @param {any} response_data 
 * @returns 
 */

const response201 = (res, message = "A new resource is created", status = true, response_data) => {
    return res.status(201).json({
        statusCode: 201,
        status,
        message,
        response_data: response_data
    })
}
const response202 = (res, message = "User is already exist", status = true, response_data) => {
    return res.status(201).json({
        statusCode: 202,
        status,
        message,
        response_data: response_data
    })
}

const response200 = (res, message = "The request is OK", status = true, response_data) => {
    if (message?.details?.length > 0 && message?.details[0]?.message) {
        response_data = message
        message = message?.details[0]?.message?.replace(/[`\-'"<>\{\}\[\]\\\/]/gi, '') || "field is required!";
    }
    return res.status(200).json({
        statusCode: 200,
        status,
        message,
        response_data: response_data
    })
}

const response400 = (res, message = "Bad Request") => {
    return res.status(400).json({
        statusCode: 400,
        message
    })
}

const response401 = (res, message = "Unauthorized Request") => {
    return res.status(401).json({
        statusCode: 401,
        message
    })
}


const response403 = (res, message = "Access is forbidden to the requested page.") => {
    return res.status(403).json({
        statusCode: 403,
        message
    })
}


const response404 = (res, message = "Not Found") => {
    return res.status(404).json({
        statusCode: 404,
        message
    })
}

const response500 = (res, message = "Internal Server Error") => {
    return res.status(500).json({
        statusCode: 500,
        message
    })
}

module.exports = {
    response201,
    response202,
    response200,
    response400,
    response401,
    response403,
    response404,
    response500
}