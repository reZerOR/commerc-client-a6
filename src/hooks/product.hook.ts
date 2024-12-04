import { TCategory } from "@/components/Categories/CategoryTable";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "@/services/ItemService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export type TProduct = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  price: number;
  quantity: number;
  category: TCategory | string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
};
export type TItem = {
  meta: {
    limit: number;
    page: number;
    total: number;
  };
  items: TProduct[];
};

export const useGetProduct = () => {
  return useQuery<TItem>({
    queryKey: ["products"],
    queryFn: async () => await getProduct(),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create_prodcut"],
    mutationFn: async (postData: FormData) => await createProduct(postData),
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update_prodcut"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Omit<TProduct, "image" | "_id">;
    }) => await updateProduct(id, payload),
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
