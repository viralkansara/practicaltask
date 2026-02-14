import axios from '../api/axios.config.js';
import { toast } from "react-toastify";
import errorMessages from '../messages.js'
export const register = async (obj) => {
    return await axios.post('/api/user/registration', obj);
}
export const login= async (obj) => {
    return await axios.post('/api/user/login', obj);
}
export const getUserDetails= async (obj) => {
    return await axios.get(`/api/user/details?userId=${obj.userId}`);
}
