import { SERVER_URL } from "@/config/config";
import axios from "axios";

export const getTeacher = async (id: string) => {
    return await axios.get(`${SERVER_URL}/teacher/${id}`);
};

export const postTeacher = async (data: any) => {
    return await axios.post(`${SERVER_URL}/teacher`, data);
};

export const updateTeacher = async (id: string, data: any) => {
    console.log(data);
    return await axios.put(`${SERVER_URL}/teacher/${id}`, data);
}

export const deleteTeacher = async (id: string) => {
    return await axios.delete(`${SERVER_URL}/teacher/${id}`);
}
