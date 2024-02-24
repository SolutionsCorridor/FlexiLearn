import { SERVER_URL } from "@/config/config";
import axios from "axios";

export const getTeacherProfile = async (id: string) => {
    return await axios.get(`${SERVER_URL}/teacher/profile/${id}`);
};

export const postTeacherProfile = async (data: any) => {
    console.log('Data', data);
    return await axios.post(`${SERVER_URL}/teacher/profile`, data);
};

export const updateTeacherProfile = async (id: string, data: any) => {
    return await axios.put(`${SERVER_URL}/teacher/profile/${id}`, data);
}

export const deleteTeacherProfile = async (id: string) => {
    return await axios.delete(`${SERVER_URL}/teacher/profile/${id}`);
}