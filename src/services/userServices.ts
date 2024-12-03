"use server";

import axiosInstance from "@/lib/axiosInstance";

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/user");

    
    return data.data;
  } catch (error: any) {
    console.log(error);
    
    throw new Error(error.message);
  }
};
