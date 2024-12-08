"use server";
import axiosInstance from "@/lib/axiosInstance";

export type TReview = {
  _id: string;
  productId: string;
  userId: { name: string };
  message: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};

export type TReviewBody = {
  productId: string;
  message: string;
  rating: number;
};
export const getReviewByProductId = async (id: string) => {
  try {
    // console.log(id);
    
    const { data } = await axiosInstance.get(`/review/${id}`);
    // console.log(data.data);

    return data.data;
  } catch (error: any) {
    // console.log(error);

    throw new Error(error.message);
  }
};
export const createReview = async (payload: TReviewBody) => {
  try {
    const { data } = await axiosInstance.post("/review", payload);
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
