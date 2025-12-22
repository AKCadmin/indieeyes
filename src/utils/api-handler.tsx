import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { BASE_URL } from "../const/conf";

// Create Axios instance
const apiClient1: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Define types
type HTTPMethod = Method;

interface RequestConfig extends AxiosRequestConfig {}

const handleRequest = async <T = any>(
  client: AxiosInstance,
  method: HTTPMethod,
  url: string,
  data?: any,
  config: RequestConfig = {}
): Promise<T> => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response: AxiosResponse<T> = await client({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log("401 found");
      // Optional logout handling
      // localStorage.clear();
      // window.location.href = "/";
    } else {
      console.error("API request error: ", error);
    }
    throw error;
  }
};

const apiHandler = {
  get: <T = any>(client: AxiosInstance, url: string, config?: RequestConfig) =>
    handleRequest<T>(client, "get", url, undefined, config),
  post: <T = any>(client: AxiosInstance, url: string, data?: any, config?: RequestConfig) =>
    handleRequest<T>(client, "post", url, data, config),
  put: <T = any>(client: AxiosInstance, url: string, data?: any, config?: RequestConfig) =>
    handleRequest<T>(client, "put", url, data, config),
  delete: <T = any>(client: AxiosInstance, url: string, config?: RequestConfig) =>
    handleRequest<T>(client, "delete", url, undefined, config),
};

export { apiClient1, apiHandler };
