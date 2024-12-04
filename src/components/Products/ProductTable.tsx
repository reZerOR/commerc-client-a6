"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetProduct } from "@/hooks/product.hook";
import Image from "next/image";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { TCategory } from "../Categories/CategoryTable";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetCategory } from "@/hooks/category.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const ProductTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("searchTerm") || "";
  const category = searchParams.get("category") || "all";
  const params = new URLSearchParams(searchParams.toString());

  const [searchInput, setSearchInput] = useState(search);
  // const [selectedCategory, setSelectedCategory] = useState(category);
  const debouncedSearch = useDebounce(searchInput, 300);
  const { data: products, isLoading } = useGetProduct(
    page?.toString() || "",
    search,
    category === "all" ? "" : category
  );
  const { data: Categories } = useGetCategory();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const updateSearchParams = useCallback(
    (name: string, value: string) => {
      router.push(`?${createQueryString(name, value)}`, { scroll: false });
    },
    [router, createQueryString]
  );

  useEffect(() => {
    if (debouncedSearch !== search) {
      params.set("searchTerm", debouncedSearch);
      router.push(`?${params.toString()}`);
    }
  }, [debouncedSearch, search, updateSearchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    params.set("category", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const totalPages = Math.ceil((products?.meta.total || 0) / limit);

  return (
    <>
      <div className="flex space-x-2">
        <Input
          placeholder="Search products..."
          value={searchInput}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {Categories?.map((item) => (
              <SelectItem key={item._id} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?${createQueryString("page", (page - 1).toString())}`}
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) handlePageChange(page - 1);
              }}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?${createQueryString("page", (index + 1).toString())}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(index + 1);
                }}
                isActive={page === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 7 && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationNext
              href={`?${createQueryString("page", (page + 1).toString())}`}
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) handlePageChange(page + 1);
              }}
              className={
                page >= totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default ProductTable;
