
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
};

const errorMiddleware = (err, req, res, next) => {
    console.error(err); 
    const { statusCode = 500, message = 'Internal Server Error' } = err;
    res.status(statusCode).json({ error: message });
};

module.exports = {
    CustomError,
    asyncHandler,
    sendErrorResponse,
    errorMiddleware,
};
