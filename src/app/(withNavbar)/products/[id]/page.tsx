"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetProductById } from "@/hooks/product.hook";
import useCartStore from "@/store/useCartStore";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProductsId = () => {
  const { id } = useParams();
  const { addItem } = useCartStore();
  console.log(id);
  const { data: product, isLoading } = useGetProductById(id as string);
  const handleAddToCart = () => {
    addItem(product!);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto flex items-center justify-center p-4 md:p-6 lg:p-8 min-h-[calc(100vh-328px)] mb-10">
      <div className="grid md:grid-cols-2 gap-4 items-center">
        <div className="relative flex items-center justify-center w-full">
          <Image
            src={product.image!}
            alt={product.title}
            width={300}
            height={300}
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4 bg-gray-200 p-6 rounded-lg">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <Badge
              variant={product.quantity > 0 ? "secondary" : "destructive"}
              className="font-popins font-semibold"
            >
              {product.quantity > 0 ? "In stock" : "Out of stock"}
            </Badge>
          </div>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <div className="flex flex-row items-center gap-2">
            <span className="text-2xl font-bold">Tk {product.price}</span>
          </div>
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full md:w-auto flex items-center gap-2"
          >
            <ShoppingCart />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsId;
