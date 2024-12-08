"use client";

import useCartStore from "@/store/useCartStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Failed = () => {
  const { clearCart } = useCartStore();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("status") === "failed") {
      clearCart();
    }
  }, [searchParams]);
  return (
    <div className="h-dvh w-full flex items-center justify-center font-popins font-semibold text-3xl">
      Your Payment Failed
    </div>
  );
};

export default Failed;
