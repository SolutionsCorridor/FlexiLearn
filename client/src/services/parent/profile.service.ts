import { SERVER_URL } from "@/config/config";
import axios from "axios";

export const getParent = async (id: string) => {
    return await axios.get(`${SERVER_URL}/parent/${id}`);
};

export const postParent = async (data: any) => {
    return await axios.post(`${SERVER_URL}/parent`, data);
};

export const updateParent = async (id: string, data: any) => {
    return await axios.put(`${SERVER_URL}/parent/${id}`, data);
}

export const deleteParent = async (id: string) => {
    return await axios.delete(`${SERVER_URL}/parent/${id}`);
}