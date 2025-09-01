import { useQuery } from "@tanstack/react-query";
import { getAllProductsServices } from "../services/productServices";

export const useProducts = () => {
  const query = useQuery({
    queryKey: ["AllProductsList"],
    queryFn: getAllProductsServices,
  });

  return {
    productList: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
                                                                                                                                                                                                                                                                                                             
