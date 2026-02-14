import axios from "axios";
import authInterceptor from '../interceptors/auth.interceptor.js'
const axiosConfig = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
authInterceptor(axiosConfig);

export default axiosConfig;