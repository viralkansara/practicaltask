import errorMessages from '../messages.js'

const authInterceptor = (axiosInstance) => {
    const publicRoutes = ["/api/user/registration", "/api/user/login"];

    axiosInstance.interceptors.request.use(
        (config) => {
            const requestUrl = config?.url || "";
            const isPublicRoute = publicRoutes.some((route) => requestUrl.includes(route));

            if (isPublicRoute) {
                return config;
            }

            const token = localStorage.getItem("token");

            if (!token) {
                return Promise.reject(new Error("Authentication token missing"));
            }

            config.headers.Authorization = `Bearer ${token}`;

            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
           const errorMessage = error?.response?.data?.message || error?.response?.data?.error || errorMessages.SOMETHING_WENT_WRONG_TO_REGISTER;
            return Promise.reject(new Error(errorMessage));
        }
    );
};

export default authInterceptor;