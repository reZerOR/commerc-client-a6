"use client";

import { useRouter} from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "../icons";
import { userRegisterSchema } from "@/lib/validation/auth";
import { useLogin, useUserRegistration } from "@/hooks/auth.hook";
import { useUser } from "@/context/user.provider";
import { useEffect } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userRegisterSchema>;

const UserRegisterForm = ({ className, ...props }: UserAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
  });
  const router = useRouter();
  const {
    mutate: handleRegister,
    isPending,
    isSuccess,
  } = useUserRegistration();
  const { setIsLoading } = useUser();

  async function onSubmit(data: FormData) {
    handleRegister(data);
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
            <Label className="" htmlFor="name">
              name
            </Label>
            <Input
              id="name"
              placeholder="jhon doe"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isPending}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
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
            <Label className="" htmlFor="phoneNumber">
              Phone
            </Label>
            <Input
              id="phoneNumber"
              placeholder="01#########"
              type="text"
              autoCapitalize="none"
              autoComplete="mobile tel"
              autoCorrect="off"
              disabled={isPending}
              {...register("phoneNumber")}
            />
            {errors?.phoneNumber && (
              <p className="px-1 text-xs text-red-600">
                {errors.phoneNumber.message}
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
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};
export default UserRegisterForm;
