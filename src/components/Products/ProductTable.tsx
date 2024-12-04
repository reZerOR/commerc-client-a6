"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProduct } from "@/hooks/product.hook";
import Image from "next/image";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

const ProductTable = () => {
  const { data: products, isLoading } = useGetProduct();
  console.log(products);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.items.map((product) => (
          <TableRow key={product._id}>
            <TableCell>
              <Image
                src={product.image!}
                width={70}
                height={70}
                alt="product image"
              />
            </TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.price.toFixed(2)}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <EditProduct />
                <DeleteProduct />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
