import { SERVER_URL } from "@/config/config";
import axios from "axios";

export const getParentProfile = async (id: string) => {
    return await axios.get(`${SERVER_URL}/parent/profile/${id}`);
};

export const postParentProfile = async (data: any) => {
    return await axios.post(`${SERVER_URL}/parent/profile`, data);
};

export const updateParentProfile = async (id: string, data: any) => {
    return await axios.put(`${SERVER_URL}/parent/profile/${id}`, data);
}

export const deleteParentProfile = async (id: string) => {
    return await axios.delete(`${SERVER_URL}/parent/profile/${id}`);
}