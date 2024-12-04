import { TCategory } from "@/components/Categories/CategoryTable";
import { createProduct, getProduct } from "@/services/ItemService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
export type TItem = {
  meta: {
    limit: number;
    page: number;
    total: number;
  };
  items: {
    _id: string;
    title: string;
    description: string;
    image?: string;
    price: number;
    quantity: number;
    category: TCategory;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
  }[];
};

export const useGetProduct = () => {
  return useQuery<TItem>({
    queryKey: ["produts"],
    queryFn: async () => await getProduct(),
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ["create_prodcut"],
    mutationFn: async (postData: FormData) => await createProduct(postData),
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
