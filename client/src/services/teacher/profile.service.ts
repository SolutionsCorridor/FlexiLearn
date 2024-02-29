import { SERVER_URL } from "@/config/config";
import axios from "axios";
import { Teacher } from '@/constants/types';

export const fetchTeacher = async (id: string): Promise<Teacher> => {
  try {
    const response = await axios.get<Teacher>(`${SERVER_URL}/teacher/${id}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return {} as Teacher;
  }
};

export const getTeacher = async (): Promise<Teacher[]> => {
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
    console.log(data);
    return await axios.put(`${SERVER_URL}/teacher/${id}`, data);
}

export const deleteTeacher = async (id: string) => {
    return await axios.delete(`${SERVER_URL}/teacher/${id}`);
}
