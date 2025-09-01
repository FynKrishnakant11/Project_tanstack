import axios from "axios";
const allPersonBaseUrl = import.meta.env.VITE_PERSONS_URL;
export const allPersonAxiosInstance = axios.create({
  baseURL: allPersonBaseUrl,
});
