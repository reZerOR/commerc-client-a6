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
import { useGetUserOrders } from "@/hooks/order.hook";
import { TOrder } from "@/services/orderService";
import { SquareArrowOutUpRight, SquareArrowUpRight } from "lucide-react";
// import { TOrder } from "@/services/orderService"
import Link from "next/link";
export default function UserOrderTable() {
  const { data: orders } = useGetUserOrders();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {new Date(
                      order.createdAt as unknown as string
                    )?.toLocaleDateString()}
                  </TableCell>
                  <TableCell>Tk {order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Link
                      href={`/orders/${order._id}`}
                      className="text-blue-600 hover:underline"
                    >
                     <SquareArrowOutUpRight/>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
