"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { TProduct } from "@/hooks/product.hook";
const EditProduct = (prodcut: TProduct) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Edit className="cursor-pointer text-blue-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ProductForm onClose={() => setIsOpen(false)} product={prodcut} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
