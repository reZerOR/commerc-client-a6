"use server";

import { TItem, TProduct } from "@/hooks/product.hook";
import axiosInstance from "@/lib/axiosInstance";

export const getProduct = async (params: Record<string, string>) => {
  try {
    const { data } = await axiosInstance.get("/item", {params});
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
export const updateProduct = async (
  id: string,
  payload:FormData
) => {
  try {
    const { data } = await axiosInstance.put(`/item/${id}`, payload, {
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
export const deleteProduct = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/item/${id}`);
    data.data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};
