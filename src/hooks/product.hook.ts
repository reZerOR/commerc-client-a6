import { TCategory } from "@/components/Categories/CategoryTable";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
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

export const useGetProduct = (
  page: string,
  searchTerm: string,
  category: string,
  sort: string
) => {
  const params: Record<string, string> = {};
  if (page) params.page = page;
  if (searchTerm) params.searchTerm = searchTerm;
  if (category) params.category = category;
  if (sort) params.sortBy = sort;
  return useQuery<TItem>({
    queryKey: ["products", page, searchTerm, category, sort],
    queryFn: async () => await getProduct(params),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery<TProduct>({
    queryKey: [id],
    queryFn: async () => await getProductById(id),
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
    mutationFn: async ({ id, payload }: { id: string; payload: FormData }) =>
      await updateProduct(id, payload),
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete_prodcut"],
    mutationFn: async (id: string) => await deleteProduct(id),
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
