"use client";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useHardUserDelete, useSoftDeleteUser } from "@/hooks/user.hook";

export default function DeleteUserButton({ userId }: { userId: string }) {
  const { mutate: hardDelete } = useHardUserDelete();
  const { mutate: softDelete } = useSoftDeleteUser();
  const handleSoftDelete = () => {
    softDelete(userId);
  };
  const handleHardDelete = () => {
    hardDelete(userId);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash className="text-red-500 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will softly delete user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <div className="space-x-2">
            <AlertDialogAction onClick={handleSoftDelete}>
              Soft
            </AlertDialogAction>
            <AlertDialogAction onClick={handleHardDelete}>
              Hard
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
