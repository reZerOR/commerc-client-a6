import { createProduct } from "@/services/ItemService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
  return useMutation({
    mutationKey: ["create_key"],
    mutationFn: async (postData: FormData) => await createProduct(postData),
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
