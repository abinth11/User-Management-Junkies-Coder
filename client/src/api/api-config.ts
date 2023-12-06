import axios, {
    AxiosError,
    AxiosInstance,
} from "axios";

const axiosAuthorized: AxiosInstance = axios.create({
    baseURL:"http://localhost:4000",
});

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:4000",
});

axiosAuthorized.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export { axiosAuthorized, axiosInstance };