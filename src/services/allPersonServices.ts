import {  apiRequest } from "../config/axios.config";

export const fetchAllPersonService = async () => {
  try {
    const res = await apiRequest.get("/");
    if (res) {
      return res.data;
    } else {
      console.log("No data found");
      return;
    }
  } catch (error) {
    console.log("Error fetching details : ", error);
  }
};
