import {
  createReview,
  getReviewByProductId,
  TReview,
  TReviewBody,
} from "@/services/reviewService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetReviewByProduct = (id: string) => {
  return useQuery<TReview[]>({
    queryKey: ["review", id],
    queryFn: async () => await getReviewByProductId(id),
  });
};

export const useCreateReview = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create_review"],
    mutationFn: async (postData: TReviewBody) => await createReview(postData),
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["review", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
