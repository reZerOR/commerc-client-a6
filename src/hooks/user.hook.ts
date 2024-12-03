import {
  createUser,
  getAllUsers,
  userHardDelete,
  userSoftDelete,
} from "@/services/userServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createuser"],
    mutationFn: async (user: TUser & { password: string }) =>
      await createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getusers"] });
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useSoftDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createuser"],
    mutationFn: async (id: string) => await userSoftDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getusers"] });
      toast.success("User softly deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useHardUserDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createuser"],
    mutationFn: async (id: string) => await userHardDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getusers"] });
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
