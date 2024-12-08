import {
  createOrder,
  getAllOrder,
  getUserOrderById,
  getUserOrders,
  TOrder,
} from "@/services/orderService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetUserOrders = () => {
  return useQuery<TOrder[]>({
    queryKey: ["user_orders"],
    queryFn: async () => await getUserOrders(),
  });
};
export const useGetAllOrders = () => {
  return useQuery<TOrder[]>({
    queryKey: ["all_orders"],
    queryFn: async () => await getAllOrder(),
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create_order"],
    mutationFn: async (payload: TOrder) => await createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_orders", 'all_orders'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetUserOrderById = (id: string) => {
  return useQuery<TOrder>({
    queryKey: ["orderUserById", id],
    queryFn: async () => await getUserOrderById(id),
  });
};
