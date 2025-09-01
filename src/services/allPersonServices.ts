import { allPersonAxiosInstance } from '../api/allPersonAxiosInstance';

export const fetchAllPersonService=async()=>{
    try {
        const res= await allPersonAxiosInstance.get("/");
        if(res){
            return res.data;
        }
        else{
            console.log("No data found");
            return;
        }
    } catch (error) {
        console.log("Error fetching details : ",error);
    }
};