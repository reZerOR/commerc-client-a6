"use client";
import { useSearchParams } from "next/navigation";
import ProductFilter from "./ProductFilter";
import ProductPagination from "./ProductPagination";
import { useGetProduct } from "@/hooks/product.hook";
import ProductCard from "./ProductCard";
import { Suspense } from "react";

const ProductListContent = () => {
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
  if(!products?.items.length!){
    return (
      <div className="text-center flex items-center justify-center">No Product available</div>
    )
  }
  return (
    <div>
      <ProductFilter />
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products?.items.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
      <ProductPagination total={products?.meta?.total || 0} />
    </div>
  );
};

export default function ProductList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListContent/>
    </Suspense>
  );
}
