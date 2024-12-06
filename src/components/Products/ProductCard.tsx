"use client";
import { TProduct } from "@/hooks/product.hook";
import {
  Card,
  CardContent,
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
      <CardHeader className="max-h-fit mb-4 mx-auto flex items-center">
        <Image
          src={product.image!}
          height={200}
          width={200}
          alt="product image"
          className="object-contain mx-auto"
        />
      </CardHeader>
      <CardContent className="">
        <CardTitle className="font-popins font-medium">
          {product.title}
        </CardTitle>
      </CardContent>
      <CardFooter className=" flex gap-2 items-center">
        <Button
          onClick={handleAddCart}
          className="w-full"
          variant={"default"}
          disabled={product.quantity <= 0}
        >
          Add <ShoppingCartIcon />
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
