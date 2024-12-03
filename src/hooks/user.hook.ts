import { getAllUsers } from "@/services/userServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export interface TUser {
  _id?: string;
  role: "USER" | "ADMIN";
  isDeleted?: boolean;
  name: string;
  email: string;
  phoneNumber: string;
}

export const useGetUsers = () => {
  return useQuery<TUser[]>({
    queryKey: ["getusers"],
    queryFn: async () => await getAllUsers(),
  });
};
export const createUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createuser"],
    mutationFn: async () => await getAllUsers(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getusers"] });
    },
  });
};
