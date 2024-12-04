import { TCategory } from "@/components/Categories/CategoryTable";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/services/categoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCategory = () => {
  return useQuery<TCategory[]>({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create_category"],
    mutationFn: async (name: string) => await createCategory(name),
    onSuccess: () => {
      toast.success("Category updated successful.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log(error);

      toast.error(error.message);
    },
  });
};

export const useCategoryUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update_category"],
    mutationFn: async ({ name, id }: { name: string; id: string }) =>
      await updateCategory(name, id),
    onSuccess: () => {
      toast.success("Category updated successful.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useCategoryDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete_category"],
    mutationFn: async (id: string) => await deleteCategory(id),
    onSuccess: () => {
      toast.success("Category deleted successful.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log(error);

      toast.error(error.message);
    },
  });
};
