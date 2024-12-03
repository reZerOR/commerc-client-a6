'use server'
import axiosInstance from "@/lib/axiosInstance";

export const createCategory = async (name: string) => {
  try {
    const { data } = await axiosInstance.post("/category", {name});
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/category");
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const updateCategory = async (name: string, id: string) => {
  try {
    const { data } = await axiosInstance.put(`/category/${id}`, {name});
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const deleteCategory = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/category/${id}`);
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
