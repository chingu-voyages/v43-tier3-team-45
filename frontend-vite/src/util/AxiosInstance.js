import axios from "axios";
import store from "../store/store";

// change for deployment
const BASE_URL = "Chinguboarddev2-env.eba-3gsq927u.us-east-2.elasticbeanstalk.com/api"; // URL for AWS EBS dev deployment

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// setting axios interceptor to include JWT for every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;