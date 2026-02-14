import * as  userValidation from '../validators/user.js';
import httpConstant from '../utils/httpStatusCode.js';
import * as userService from '../services/user.js';
import httpMessage from '../utils/httpMessage.js';
import { formateValidationError } from '../utils/utils.js';
import ApiError from '../utils/apiError.js';

export const registration = async (req, res, next) => {
    try {
        const validateUser = userValidation.userRegistration.validate(req.body, { abortEarly: true });
        if (validateUser?.error) {
            throw new ApiError({ statusCode: httpConstant.REQUIRED_PARAMETER_MISSING, message: formateValidationError(validateUser) });
        }
        const userAuthToken = await userService.userRegistration(req.body);
        res.status(httpConstant.CREATED).json(userAuthToken);
    } catch (error) {
        next(error);
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const validateUser = userValidation.userLogin.validate(req.body, { abortEarly: true });
        if (validateUser?.error) {
            throw new ApiError({ statusCode: httpConstant.REQUIRED_PARAMETER_MISSING, message: formateValidationError(validateUser) });
        }
        const userAuthToken = await userService.userLogin(req.body);
        res.status(httpConstant.SUCCESS).json(userAuthToken);
    } catch (error) {
        next(error);
    }
};

export const getUserDetails = async (req, res, next) => {
    try {
        const validateUser = userValidation.getUserDetails.validate(req.query, { abortEarly: true });
        if (validateUser?.error) {
            throw new ApiError({ statusCode: httpConstant.REQUIRED_PARAMETER_MISSING, message: formateValidationError(validateUser) });
        }
        const getUsers = await userService.getUserDetails(req.query);
        res.status(httpConstant.SUCCESS).json(getUsers);
    } catch (error) {
        next(error);
    }
};

