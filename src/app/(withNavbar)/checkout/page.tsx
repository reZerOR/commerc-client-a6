'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { TOrderShippingAddress, useOrderSummary } from '@/hooks/useOrderSummery'
import { useUser } from '@/context/user.provider'

type CheckoutFormInputs = TOrderShippingAddress & {
  email: string;
  name: string;
}

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const {user} = useUser()
  const orderSummary = useOrderSummary()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormInputs>()

  const onSubmit: SubmitHandler<CheckoutFormInputs> = async (data) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation email shortly.",
      })
      
      router.push('/order-confirmation')
    } catch (error) {
      toast({
        title: "Error placing order",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  <Input id="name" defaultValue={user?.name || ''} {...register("name", { required: "Name is required" })} />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user?.email || ''} type="email" {...register("email", { required: "Email is required" })} />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" {...register("street", { required: "Street address is required" })} />
                {errors.street && <p className="text-red-500 text-sm">{errors.street.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...register("city", { required: "City is required" })} />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" {...register("state", { required: "State is required" })} />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input id="zipCode" {...register("zipCode", { required: "Zip code is required" })} />
                  {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" {...register("country", { required: "Country is required" })} />
                  {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
              {isSubmitting ? "Processing..." : "Place Order"}
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
                  <span>{item.name} x {item.quantity}</span>
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
  )
}

