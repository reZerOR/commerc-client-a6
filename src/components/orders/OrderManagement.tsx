"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X, Eye } from "lucide-react";
import { TUser } from "@/hooks/user.hook";
import { TItem, TProduct } from "@/hooks/product.hook";
import { useCancelOrder, useGetAllOrders } from "@/hooks/order.hook";
import { useEffect, useState } from "react";
import { TOrder } from "@/services/orderService";
import { toast } from "sonner";

export default function OrderManagement() {
  const [open, setIsOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const [dialogOrder, setDialogOrder] = useState<TOrder>();
  const [orderId, setOrderId] = useState("");
  const { data: orders, isLoading } = useGetAllOrders();
  const { mutate: cancelOrder } = useCancelOrder();
  // // console.log(orders);
  if (isLoading) {
    return (
      <div className="h-dvh w-full flex items-center justify-center font-popins text-3xl font-semibold">
        Loading ...
      </div>
    );
  }
  const handleCancelOrder = () => {
    cancelOrder(orderId);
    setAlertOpen(false);
  };

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold mb-5">Order history</h1>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="hidden md:table-cell">
                {order._id}
              </TableCell>
              <TableCell>{(order.user as TUser).name}</TableCell>
              <TableCell>Tk {order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <div className="flex md:flex-row flex-col items-center gap-2">
                  <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setOrderId(order._id!);
                          setAlertOpen(true);
                        }}
                        disabled={order.status === "cancelled"}
                      >
                        <X />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel this order? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleCancelOrder()}>
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Dialog open={open} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDialogOrder(order)}
                      >
                        <Eye />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="">
                      <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                          Full details for Order ID: {dialogOrder?._id}
                        </DialogDescription>
                      </DialogHeader>
                      {dialogOrder && (
                        <div className="mt-4">
                          <h3 className="font-semibold">Items:</h3>
                          <ul>
                            {dialogOrder.items.map((item, index) => (
                              <li key={index}>
                                {(item.item as TProduct).title} - Quantity:{" "}
                                {item.quantity}, Price: Tk {item.price.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-2">
                            <strong>Total Price:</strong> Tk {" "}
                            {dialogOrder.totalPrice.toFixed(2)}
                          </p>
                          <p>
                            <strong>Status:</strong> {dialogOrder.status}
                          </p>
                          <p>
                            <strong>Payment Status:</strong>{" "}
                            {dialogOrder.paymentStatus}
                          </p>
                          <h3 className="font-semibold mt-4">
                            Shipping Address:
                          </h3>
                          <p>{dialogOrder.shippingAddress.street}</p>
                          <p>
                            {dialogOrder.shippingAddress.city},{" "}
                            {dialogOrder.shippingAddress.state}{" "}
                            {dialogOrder.shippingAddress.zipCode}
                          </p>
                          <p>{dialogOrder.shippingAddress.country}</p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
