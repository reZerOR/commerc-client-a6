"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategoryForm from "./CategoryForm";
import { useState } from "react";
import { TCategory } from "./CategoryTable";
import { Edit } from "lucide-react";
const EditCategory = ({ ...category }: TCategory) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Edit className="cursor-pointer text-blue-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <CategoryForm onClose={() => setIsOpen(false)} category={category} />
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
