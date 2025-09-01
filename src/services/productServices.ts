import { productAxiosInstance } from "../api/axiosInstanceProduct";

export const getAllProductsServices = async () => {
  try {
    const allProducts = import.meta.env.VITE_URL_PRODUCTS;
    const res = await productAxiosInstance.get(`/${allProducts}`);
    // console.log("The data is ",res.data);
    return res.data;
  } catch (error) {
    console.log("Error fetching the data", error);
  }
};
