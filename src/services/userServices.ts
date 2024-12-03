"use server";

import { TUser } from "@/hooks/user.hook";
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
export const createUser = async (payload: TUser & { password: string }) => {
  try {
    const { data } = await axiosInstance.post("/user/create-user", payload);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const userSoftDelete = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/user/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const userHardDelete = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/user/delete/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
