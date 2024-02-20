module.exports = {
    handleDataToReturn(data) {
        return {success: true, data: data.rows || data, dataCount: data.count}
    },

    handleError (res, error, code = 400) {debugger
        res.status(code);
        res.json({
            status: code,
            message: error?.message || error,
            success: false
        });
    }
}

/**
 * 200 ok
 * 3xx Redirection
 * 4xx Client Error
 * 403 Forbidden -  The 403 status code indicates that the server understood the request, but it refuses to authorize it
 * 5xx Server Error
 */
