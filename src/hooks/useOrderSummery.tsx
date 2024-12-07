import { useMemo } from "react";
import useCartStore from "@/store/useCartStore";
import { TProduct } from "./product.hook";
import { TUser } from "./user.hook";

export type TOrderItem = {
  name: string;
  item: string | TProduct;
  quantity: number;
  price: number;
};
export type TOrder = {
  user?: string | TUser;
  items: TOrderItem[];
  totalPrice: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  transactionId?: string;
  paymentStatus: "unpaid" | "paid" | "failed";
  shippingAddress: TOrderShippingAddress;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TOrderShippingAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export function useOrderSummary() {
  const cartItems = useCartStore((state) => state.items);

  const orderSummary: Partial<TOrder> = useMemo(() => {
    const items: TOrderItem[] = cartItems.map((item) => ({
      name: item.title,
      item: item._id,
      quantity: item.userQuantity,
      price: item.price,
    }));

    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return {
      items,
      totalPrice,
      status: "pending",
      paymentStatus: "unpaid",
    };
  }, [cartItems]);

  return orderSummary;
}
