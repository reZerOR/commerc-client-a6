"use client";
import { TProduct } from "@/hooks/product.hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCartIcon, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import { useUser } from "@/context/user.provider";
import { toast } from "sonner";
import { TCategory } from "../Categories/CategoryTable";

const ProductCard = ({ product }: { product: TProduct }) => {
  const { addItem } = useCartStore();
  const { user } = useUser();
  const handleAddCart = () => {
    if (!user) {
      toast.warning("You are not logged in");
    } else {
      addItem(product);
    }
  };
  return (
    <Card className="flex flex-col justify-end relative">
      <div className="p-2">
        <CardHeader className="max-h-fit mx-auto flex items-center w-full bg-slate-200  rounded-lg">
          <div className="">
            <Image
              src={product.image!}
              height={200}
              width={200}
              alt="product image"
              className="object-contain min-h-48 md:max-h-48 mx-auto"
            />
          </div>
        </CardHeader>
      </div>
      <CardContent className="">
        <CardTitle className="font-popins font-medium">
          {product.title}
        </CardTitle>
        <CardDescription>
          {(product.category as TCategory).name}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex gap-2 items-center">
        <Button
          onClick={handleAddCart}
          className="w-full group"
          variant={"default"}
          disabled={product.quantity <= 0}
        >
          Add{" "}
          <ShoppingCartIcon className="group-hover:-rotate-12 transition-all duration-500" />
        </Button>
        <Link href={`/products/${product._id}`}>
          <Button variant={"ghost"} size={"icon"}>
            <SquareArrowOutUpRight />
          </Button>
        </Link>
      </CardFooter>
      <p className="absolute top-4 right-4 bg-black text-white font-popins px-2 rounded-full">
        Tk {product.price}
      </p>
    </Card>
  );
};

export default ProductCard;
