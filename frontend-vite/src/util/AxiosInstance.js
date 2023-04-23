import axios from "axios";

const BASE_URL = "https://chinguboard.up.railway.app/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

let store;

export const injectStore = (_store) => {
  store = _store;
};

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
