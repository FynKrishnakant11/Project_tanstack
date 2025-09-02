import { useQuery } from "@tanstack/react-query";
import { fetchAllPersonService } from "../services/allPersonServices";

const useAllPerson= () => {
  const query = useQuery({
    queryKey: ["allPersonDetails"],
    queryFn: fetchAllPersonService,
  });
  return {
    allPersonDetails: query.data,
    allPersonIsLoading: query.isLoading,
    allPersonIsError: query.isError,
  };
};
export default useAllPerson;
