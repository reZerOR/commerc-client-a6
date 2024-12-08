"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetProductById } from "@/hooks/product.hook";
import useCartStore from "@/store/useCartStore";
import { Divide, Loader2, ShoppingCart, Star, User } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateReview, useGetReviewByProduct } from "@/hooks/review.hook";
import { create } from "zustand";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/context/user.provider";
import { toast } from "sonner";

// Mock reviews data
const initialReviews = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    comment: "Great product! Highly recommended.",
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 4,
    comment: "Good quality, but a bit pricey.",
  },
  {
    id: 3,
    author: "Mike Johnson",
    rating: 5,
    comment: "Excellent service and fast delivery.",
  },
];

const ProductsId = () => {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const { user } = useUser();
  const { data: product, isLoading } = useGetProductById(id as string);
  const { data: reviews, isLoading: isReviewLoading } = useGetReviewByProduct(
    id as string
  );
  const { mutate: createReview, isPending } = useCreateReview(id as string);
  // // console.log(reviews);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  const handleAddToCart = () => {
    addItem(product!);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You are not logged in");
    } else {
      createReview({
        productId: id as string,
        rating: newReview.rating,
        message: newReview.comment,
      });

      setNewReview({ rating: 5, comment: "" });
    }
  };

  if (isLoading || isReviewLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 mb-10">
      <div className="grid md:grid-cols-2 gap-4 items-center mb-8">
        <div className="relative flex items-center justify-center w-full">
          <Image
            src={product.image!}
            alt={product.title}
            width={300}
            height={300}
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4 bg-gray-200 p-6 rounded-lg">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <Badge
              variant={product.quantity > 0 ? "secondary" : "destructive"}
              className="font-popins font-semibold"
            >
              {product.quantity > 0 ? `In stock ${product.quantity}` : "Out of stock"}
            </Badge>
          </div>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <div className="flex flex-row items-center gap-2">
            <span className="text-2xl font-bold">Tk {product.price}</span>
          </div>
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full md:w-auto flex items-center gap-2"
          >
            <ShoppingCart />
            Add to cart
          </Button>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {/* Review Form */}
        <form
          onSubmit={handleReviewSubmit}
          className="mb-8 bg-gray-100 p-4 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rating">Rating</Label>
              <select
                id="rating"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    rating: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded-md"
                required
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num !== 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" disabled={!user}>
              Submit Review
            </Button>
          </div>
        </form>

        {/* Review List */}
        {reviews?.length! > 0 ? (
          <div className="space-y-4">
            {reviews?.map((review) => (
              <div key={review._id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-2 gap-2">
                  <Avatar>
                    <AvatarFallback className="bg-gray-300">
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-semibold mr-2">
                      {review.userId.name}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>No Reviews yet</div>
        )}
      </div>
    </div>
  );
};

export default ProductsId;
