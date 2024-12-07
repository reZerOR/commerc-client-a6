import { createOrder, getUserOrderById, TOrder } from "@/services/orderService";
import { getUserById } from "@/services/userServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create_category"],
    mutationFn: async (payload: TOrder) => await createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetUserOrderById = (id: string) => {
    return useQuery<TOrder>({
      queryKey: [id],
      queryFn: async () => await getUserOrderById(id),
    });
  };
