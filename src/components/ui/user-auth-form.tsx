"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "../icons";
import { userAuthSchema } from "@/lib/validation/auth";
import { useLogin } from "@/hooks/auth.hook";
import { useUser } from "@/context/user.provider";
import { useEffect } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const router = useRouter();
  const { mutate: handleLogin, isPending, isSuccess } = useLogin();
  const { setIsLoading } = useUser();

  async function onSubmit(data: FormData) {
    handleLogin(data);
  }
  useEffect(() => {
    if (!isPending && isSuccess) {
      setIsLoading(true);
      router.push("/");
    }
  }, [isPending, isSuccess]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="password">
              password
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoComplete="password"
              disabled={isPending}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
export default UserAuthForm;
