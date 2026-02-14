import bcrypt from 'bcrypt';
import httpConstant from './httpStatusCode.js';
import httpMessage from './httpMessage.js';
import jwt from 'jsonwebtoken';
import ApiError from './apiError.js';

export const generateEncryptedPassword = async (password) => {
    try {
        const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw new ApiError({ statusCode: httpConstant.INTERNAL_SERVER_ERROR, message: error.message ?? httpMessage.PASSWORD_ENCRYPTION_ERROR });
    }
};

export const comparePassword = async ({ hashedPassword, plainPassword }) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw new ApiError({ statusCode: httpConstant.INTERNAL_SERVER_ERROR, message: error.message ?? httpMessage.PASSWORD_COMPARISON_ERROR });
    }
};


export const generateJwtToken = (data) => {
    try {
        return jwt.sign(data, process.env.JWT_SECRET_KEY);
    } catch (error) {
        throw new ApiError({ statusCode: httpConstant.INTERNAL_SERVER_ERROR, message: error.message ?? httpMessage.TOKEN_GENERATION_ERROR });
    }
};

export const formateValidationError = (data) => {
    try {
        const message = data?.error?.details?.[0]?.message?.replaceAll(/\"/g, "");
        if (!message) {
            throw new ApiError({
                statusCode: httpConstant.BAD_REQUEST,
                message: httpMessage.VALIDATION_MESSAGE_FORMAT_ERROR,
            });
        }
        return message;
    } catch (error) {
        throw new ApiError({ statusCode: httpConstant.INTERNAL_SERVER_ERROR, message: error.message ?? httpMessage.VALIDATION_MESSAGE_FORMAT_ERROR });
    }
};
