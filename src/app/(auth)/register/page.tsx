"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ChevronLeft } from "lucide-react";
import UserRegisterForm from "@/components/ui/user-register-form";
export default function RegisterPage() {
  return (
    <div className="container mx-auto flex h-screen w-screen flex-col justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold font-popins">Welcome</h1>
          <p className="text-sm text-muted-foreground">
            Create a new account for you
          </p>
        </div>
        <UserRegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
           Already have an account? Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
