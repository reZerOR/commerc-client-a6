"use client";

import { useGetProduct } from "@/hooks/product.hook";
import ProductCard from "./ProductCard";

const NewProducts = () => {
  const { data: product } = useGetProduct("", "", "", "");
  console.log(product);
  
  return (
    <div>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {product?.items.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
