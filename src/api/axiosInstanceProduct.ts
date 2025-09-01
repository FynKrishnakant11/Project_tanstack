import axios from "axios";
const productBaseUrl = import.meta.env.VITE_URL_DUMMY_JSON;
export const productAxiosInstance = axios.create({
  baseURL: productBaseUrl,
});
