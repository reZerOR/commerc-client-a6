"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetAllOrders } from "@/hooks/order.hook";
// Mock data for demonstration
export default function PaymentHistory() {
  const { data: orders, isLoading } = useGetAllOrders();
  if (isLoading) {
    return (
      <div className="h-dvh w-full flex items-center justify-center font-popins text-3xl font-semibold">
        {" "}
        Loading ...
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "unpaid":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Payment History</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment ID</TableHead>
            <TableHead className="hidden lg:table-cell">Order ID</TableHead>
            <TableHead className="hidden lg:table-cell">Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((payment) => (
            <TableRow key={payment._id}>
              <TableCell>{payment.transactionId}</TableCell>
              <TableCell className="hidden lg:table-cell">{payment._id}</TableCell>
              <TableCell className="hidden lg:table-cell">Tk {payment.totalPrice}</TableCell>
              <TableCell>
                {new Date(
                  payment.createdAt as unknown as string
                ).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  className={`${getStatusColor(
                    payment.paymentStatus as string
                  )}`}
                >
                  {payment.paymentStatus}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
