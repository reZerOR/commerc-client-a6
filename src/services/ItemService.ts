"use server";

import axiosInstance from "@/lib/axiosInstance";

export const getProduct = async () => {
  try {
    const { data } = await axiosInstance.get("/item");
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createProduct = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post("/item", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    data.data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};
