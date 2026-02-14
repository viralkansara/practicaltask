import httpConstant from '../utils/httpStatusCode.js';

const errorHandler = (err, req, res, next) => {
    return res.status(err?.statusCode ?? httpConstant.INTERNAL_SERVER_ERROR).json({
        status: false,
        error: err.message
    });
};
export default errorHandler;