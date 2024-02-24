import { SERVER_URL } from "@/config/config";
import axios from "axios";

export const getStudentProfile = async (id: string) => {
    return await axios.get(`${SERVER_URL}/student/profile/${id}`);
};

export const postStudentProfile = async (data: any) => {
    return await axios.post(`${SERVER_URL}/student/profile`, data);
};

export const updateStudentProfile = async (id: string, data: any) => {
    return await axios.put(`${SERVER_URL}/student/profile/${id}`, data);
}

export const deleteStudentProfile = async (id: string) => {
    return await axios.delete(`${SERVER_URL}/student/profile/${id}`);
}