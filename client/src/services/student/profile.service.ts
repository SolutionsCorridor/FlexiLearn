import { SERVER_URL } from "@/config/config";
import axios from "axios";

export const getStudent = async (id: string) => {
    return await axios.get(`${SERVER_URL}/student/${id}`);
};

export const postStudent = async (data: any) => {
    return await axios.post(`${SERVER_URL}/student`, data);
};

export const updateStudent = async (id: string, data: any) => {
    return await axios.put(`${SERVER_URL}/student/${id}`, data);
}

export const deleteStudent = async (id: string) => {
    return await axios.delete(`${SERVER_URL}/student/${id}`);
}