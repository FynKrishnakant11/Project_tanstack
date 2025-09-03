import { useQuery } from "@tanstack/react-query";
import { handleGlobalGetRequestQuery } from "../functions/globalApiRequest";
const useAllPerson= () => {
  const query = useQuery({
    queryKey: ["allPersonDetails"],
    queryFn: handleGlobalGetRequestQuery,
  });
  return {
    allPersonDetails: query.data,
    allPersonIsLoading: query.isLoading,
    allPersonIsError: query.isError,
  };
};
export default useAllPerson;