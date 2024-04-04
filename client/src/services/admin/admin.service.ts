import { SERVER_URL } from "@/config/config";
import axios from "axios";

export const getAllUsers = async () => {
    return await axios.get(`${SERVER_URL}/user`);
};