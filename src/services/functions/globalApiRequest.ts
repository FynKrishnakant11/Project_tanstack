import { apiRequest } from "../configs/axios.config";
const handleGlobalGetRequestQuery = async () => {
  try {
    const res = await apiRequest.get("/");
    if (res) {
      return res;
    } else {
      console.log("No data found");
      return;
    }
  } catch (error) {
    console.log("Error fetching details : ", error);
  }
};
export {handleGlobalGetRequestQuery};