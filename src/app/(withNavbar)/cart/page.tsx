"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useCartStore from "@/store/useCartStore";
import { it } from "node:test";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    userEmail,
    setUserEmail,
  } = useCartStore();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 ">
      <div className="min-h-[calc(100vh-64px)]">
        <h1 className="text-center font-popins text-4xl font-semibold my-10">
          Cart
        </h1>
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={50}
                        className="mr-4"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        Tk {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={item.userQuantity === 1}
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          Math.max(1, item.userQuantity - 1)
                        )
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.userQuantity}
                      onChange={(e) =>
                        updateQuantity(item._id, parseInt(e.target.value) || 1)
                      }
                      className="w-16 mx-2 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item._id, item.userQuantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => removeItem(item._id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <p className="font-semibold">Total: {totalPrice.toFixed(2)}/=</p>
            </div>
            <div>
              <Button variant="outline" onClick={clearCart} className="mr-2">
                Clear Cart
              </Button>
              <Button>Checkout</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
