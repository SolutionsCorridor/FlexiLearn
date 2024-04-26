import { SERVER_URL } from "@/config/config";
import axios from "axios";



export const getAllUsers = async (page:number, limit:number, query: string | null) => {
    const params = { page, limit, query };
    return await axios.get(`${SERVER_URL}/user`, { params });
};