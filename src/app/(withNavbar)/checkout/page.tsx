"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  TOrderShippingAddress,
  useOrderSummary,
} from "@/hooks/useOrderSummery";
import { useUser } from "@/context/user.provider";
import { TOrder } from "@/services/orderService";
import { useState } from "react";

type CheckoutFormInputs = TOrderShippingAddress & {
  email: string;
  name: string;
};
type TOrderResponse = {
  success: boolean;
  message: string;
  data: {
    result: string;
    payment_url: string;
  };
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useUser();
  const orderSummary = useOrderSummary();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormInputs>();

  const onSubmit: SubmitHandler<CheckoutFormInputs> = async (data) => {
    setIsPending(true);
    const payload: TOrder = {
      shippingAddress: {
        city: data.city,
        country: data.country,
        zipCode: data.zipCode,
        state: data.state,
        street: data.street,
      },
      totalPrice: orderSummary.totalPrice!,
      items: orderSummary.items!.map((i) => ({
        item: i.item,
        quantity: i.quantity,
        price: i.price,
      })),
    };
    try {
      const result = await fetch("http://localhost:5000/api/v1/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("accessToken="))
              ?.split("=")[1] || "",
        },
        credentials: "include", // Ensures cookies are sent with the request
        body: JSON.stringify(payload),
      });

      if (!result.ok) {
        throw new Error(`Error: ${result.status} ${result.statusText}`);
      }

      const response: TOrderResponse = await result.json();
      console.log(response);

      if (response.data.result === "true") {
        // redirect(response.data.payment_url);
        router.push(response.data.payment_url);
      }
    } catch (error) {
      setIsPending(false);
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="order-2 lg:order-1">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    readOnly
                    defaultValue={user?.name || ""}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    defaultValue={user?.email || ""}
                    readOnly
                    type="email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  {...register("street", {
                    required: "Street address is required",
                  })}
                />
                {errors.street && (
                  <p className="text-red-500 text-sm">
                    {errors.street.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("city", { required: "City is required" })}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    {...register("state", { required: "State is required" })}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    {...register("zipCode", {
                      required: "Zip code is required",
                    })}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    {...register("country", {
                      required: "Country is required",
                    })}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {isPending ? "Processing..." : "Place Order"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="order-1 lg:order-2">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {orderSummary.items?.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>Tk {(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Tk {orderSummary.totalPrice?.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
