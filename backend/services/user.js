import httpStatusCode from '../utils/httpStatusCode.js';
import httpMessage from '../utils/httpMessage.js';
import UserModel from '../models/user.js';
import { generateEncryptedPassword, generateJwtToken, comparePassword } from '../utils/utils.js';
import ApiError from '../utils/apiError.js';

export const userRegistration = async (opts) => {
    try {
        //check user email for duplication
        const findUserEmail = await UserModel.findOne({ where: { email: opts.email } });

        if (findUserEmail) {
            throw new ApiError({ statusCode: httpStatusCode.DUPLICATE, message: httpMessage.EMAIL_ALREADY_EXIST });
        }

        const encryptedPassword = await generateEncryptedPassword(opts.password);

        const userCreateObj = {
            firstName: opts.firstName,
            lastName: opts.lastName,
            password: encryptedPassword,
            email: opts.email,
            number: opts.number
        };

        //create user in database 
        let createUserResponse = await UserModel.create(userCreateObj);
        createUserResponse = createUserResponse.get({ plain: true });

        //create token 
        const userAuthToken = generateJwtToken({ userId: createUserResponse.id, email: createUserResponse.email });

        return { status: true, data: { token: userAuthToken, userId: createUserResponse.id } };
    } catch (error) {
        throw new ApiError({ statusCode: error.statusCode ?? httpStatusCode.INTERNAL_SERVER_ERROR, message: error.message ?? httpMessage.USER_REGISTRATION_ERROR });
    }
};

export const userLogin = async ({ email, password }) => {
    try {
        //find user
        const findUserData = await UserModel.findOne({ where: { email: email } });

        if (!findUserData) {
            throw new ApiError({ statusCode: httpStatusCode.NOT_FOUND, message: httpMessage.EMAIL_NOT_FOUND });
        }

        //check password
        const comparePasswordResults = await comparePassword({ hashedPassword: findUserData.password, plainPassword: password });
        if (!comparePasswordResults) {
            throw new ApiError({ statusCode: httpStatusCode.NOT_FOUND, message: httpMessage.PASSWORD_NOT_MATCHED });
        }

        const userAuthToken = generateJwtToken({ userId: findUserData.id, email: findUserData.email });
        return { status: true, data: { token: userAuthToken, userId: findUserData.id } };
    } catch (error) {
        throw new ApiError({ statusCode: error.statusCode ?? httpStatusCode.INTERNAL_SERVER_ERROR, message: error.message ?? httpMessage.USER_LOGIN_ERROR });
    }
};

export const getUserDetails = async ({ userId }) => {
    try {
        const findUserData = await UserModel.findOne({
            where: { id: userId }, attributes: {
                exclude: ["password", "createdAt", 'updatedAt'],
            }
        });

        if (!findUserData) {
            throw new ApiError({ statusCode: httpStatusCode.NOT_FOUND, message: httpMessage.USER_DETAILS_NOT_FOUND });
        }
        return { status: true, data: findUserData };
    } catch (error) {
        throw new ApiError({ statusCode: error.statusCode ?? httpStatusCode.INTERNAL_SERVER_ERROR, message: error.message ?? httpMessage.USER_DETAILS_FIND_ERROR });
    }
};

export const addDefaultUser = async () => {
    try {
        const userCount = await UserModel.count();
        if (userCount === 0) {
            const encryptedPassword = await generateEncryptedPassword('Password@123');
            await UserModel.create({
                firstName: 'Test',
                lastName: 'User',
                email: 'testuser@gmail.com',
                password: encryptedPassword,
                number: '1234567890',
            });
            console.log('Default user created');
        }
    } catch (error) {
        throw new ApiError({ statusCode: error.statusCode ?? httpStatusCode.INTERNAL_SERVER_ERROR, message: error.message ?? httpMessage.DEFAULT_USER_CREATION_ERROR });
    }
}
