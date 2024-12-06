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
import { TCategory } from "../Categories/CategoryTable";
import { useSearchParams } from "next/navigation";
import ProductFilter from "./ProductFilter";
import ProductPagination from "./ProductPagination";

const ProductTable = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "default";
  const search = searchParams.get("searchTerm") || "";
  const category = searchParams.get("category") || "all";
  const { data: products, isLoading } = useGetProduct(
    page?.toString() || "",
    search,
    category === "all" ? "" : category,
    sort === "default" ? "" : sort
  );

  return (
    <>
      <ProductFilter />
      <div className="">
        <Table className="overflow-scroll">
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.items.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="hidden md:table-cell">
                  <Image
                    src={product.image!}
                    width={70}
                    height={70}
                    alt="product image"
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="hidden md:table-cell">{product.quantity}</TableCell>
                <TableCell>{(product.category as TCategory).name}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditProduct {...product} />
                    <DeleteProduct id={product._id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ProductPagination total={products?.meta.total! || 0} />
    </>
  );
};

export default ProductTable;
