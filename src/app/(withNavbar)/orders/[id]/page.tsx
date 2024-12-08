"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUserOrderById } from "@/hooks/order.hook";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { data: order, isLoading } = useGetUserOrderById(id as string);

  if (isLoading) {
    return (
      <div className="h-dvh w-full flex items-center justify-center font-popins text-3xl font-semibold">
        {" "}
        Loading ...
      </div>
    );
  }
  if (!order) {
    return (
      <div className="h-dvh w-full flex items-center justify-center font-popins text-3xl font-semibold">
        No order History 😵
      </div>
    );
  }
  return (
    <div className="container mx-auto mb-20">
      <h1 className="text-3xl font-semibold font-popins text-center py-10 md:py-20">
        Order Details
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Order Details - #{id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold">Order Information</h3>
              <p>
                Date:{" "}
                {new Date(
                  order?.createdAt as unknown as string
                )?.toLocaleDateString()}
              </p>
              <p>Status: {order?.status}</p>
              <p>Payment Status: {order?.paymentStatus}</p>
              <p>Transaction ID: {order?.transactionId}</p>
            </div>
            <div>
              <h3 className="font-semibold">Shipping Address</h3>
              <p>{order?.shippingAddress.street}</p>
              <p>
                {order?.shippingAddress.city}, {order?.shippingAddress.state}{" "}
                {order?.shippingAddress.zipCode}
              </p>
              <p>{order?.shippingAddress.country}</p>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {typeof item.item === "string"
                      ? item.item
                      : item.item.title}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>Tk {item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    Tk {(item.quantity * item.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-semibold">
                  Total:
                </TableCell>
                <TableCell className="font-semibold">
                  Tk {order?.totalPrice.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
