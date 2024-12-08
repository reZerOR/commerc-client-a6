"use client";

import useCartStore from "@/store/useCartStore";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const FailedContent = () => {
  const { clearCart } = useCartStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("status") === "failed") {
      clearCart();
    }
  }, [searchParams, clearCart]);

  return (
    <div className="h-dvh w-full flex items-center justify-center font-popins font-semibold text-3xl">
      Your Payment Failed
    </div>
  );
};

const Failed = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailedContent />
    </Suspense>
  );
};

export default Failed;