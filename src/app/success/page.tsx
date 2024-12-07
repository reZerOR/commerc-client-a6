"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetUserOrderById } from "@/hooks/order.hook";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const { data: order, isLoading } = useGetUserOrderById(orderId!);
  console.log(order, isLoading);

  if (isLoading) {
    return (
      <div className="h-dvh w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Order Successful!
          </CardTitle>
          <CardDescription className="text-center">
            Thank you for your purchase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Order Items:</h3>
            <ul className="list-disc list-inside">
              {order?.items.map((item, index) => (
                <li key={index}>
                  {typeof item.item === "string" ? item.item : item.item.title}{" "}
                  - Quantity: {item.quantity}, Price: Tk {item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Total Price:</h3>
            <p>Tk {order?.totalPrice.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Shipping Address:</h3>
            <p>
              {order?.shippingAddress.street}, {order?.shippingAddress.city},{" "}
              {order?.shippingAddress.state} {order?.shippingAddress.zipCode},{" "}
              {order?.shippingAddress.country}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Status:</h3>
            <Badge variant="outline">{order?.status}</Badge>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Payment Status:</h3>
            <Badge
              variant={
                order?.paymentStatus === "paid" ? "secondary" : "destructive"
              }
            >
              {order?.paymentStatus}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
