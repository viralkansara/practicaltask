import httpStatusCode from '../utils/httpStatusCode.js';
import httpMessage from '../utils/httpMessage.js';
import jwt from "jsonwebtoken";
import ApiError from '../utils/apiError.js';

const authMiddleware = async (req, res, next) => {
  try {
    let rawToken = req.headers["authorization"];
    if (!rawToken) {
      throw new ApiError({ statusCode: httpStatusCode.NOT_FOUND, message: httpMessage.TOKEN_NOT_FOUND });
    }

    if (rawToken && rawToken.includes(" ")) {
      rawToken = rawToken.split(" ")[1];
    }

    jwt.verify(rawToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        throw new ApiError({
          statusCode: httpStatusCode.UNAUTHORIZED,
          message: httpMessage.UNAUTHORIZED_ACCESS,
        });
      }
      else {
        return decoded;
      }

    });

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;