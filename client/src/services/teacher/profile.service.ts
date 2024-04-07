import { SERVER_URL } from "@/config/config";
import axios from "axios";
import { Teacher } from '@/constants/types';

export const getTeacher = async (id: string): Promise<Teacher> => {
  try {
    const response = await axios.get<Teacher>(`${SERVER_URL}/teacher/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return {} as Teacher;
  }
};

export const getTeachers = async (): Promise<Teacher[]> => {
  try {
    const response = await axios.get<Teacher[]>(`${SERVER_URL}/teacher`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
};

export const postTeacher = async (data: any) => {
  return await axios.post(`${SERVER_URL}/teacher`, data);
};

export const updateTeacher = async (id: string, data: any) => {
  return await axios.put(`${SERVER_URL}/teacher/${id}`, data);
}

export const deleteTeacher = async (id: string) => {
  return await axios.delete(`${SERVER_URL}/teacher/${id}`);
}

export const updateComments = async (id: string, adminComments: string) => {
  return await axios.put(`${SERVER_URL}/teacher/comments/${id}`, { adminComments });
}