"use server";
import { TProduct } from "@/hooks/product.hook";
import { TUser } from "@/hooks/user.hook";
import axiosInstance from "@/lib/axiosInstance";
export type TOrderItem = {
  item: string | TProduct;
  quantity: number;
  price: number;
};

export type TOrderShippingAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type TOrder = {
  _id?: string;
  user?: string | TUser;
  items: TOrderItem[];
  totalPrice: number;
  status?: "pending" | "processing" | "completed" | "cancelled";
  transactionId?: string;
  paymentStatus?: "unpaid" | "paid" | "failed";
  shippingAddress: TOrderShippingAddress;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export const getAllOrder = async()=>{
  try {
    const { data } = await axiosInstance.get(`/order`);
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const createOrder = async (payload: TOrder) => {
  try {
    const { data } = await axiosInstance.post("/order", payload);
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getUserOrderById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/order/user/${id}`);
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getUserOrders = async () => {
  try {
    const { data } = await axiosInstance.get(`/order/user`);
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
