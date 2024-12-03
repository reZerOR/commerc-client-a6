"use server";

import axiosInstance from "@/lib/axiosInstance";

export const createProduct = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post("/item", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
