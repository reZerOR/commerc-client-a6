"use client";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  LogOut,
  UserIcon,
  ShoppingBag,
  LayoutDashboard,
  User,
  ShoppingCart,
} from "lucide-react";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/authService";
import { LogoutIcon } from "../animateIcons/logout";
import useCartStore from "@/store/useCartStore";
import { usePathname, useRouter } from "next/navigation";

export const protectedRoutes = [
  "/cart",
  "/orders/:page*",
  "/checkout"
];
export function AvatarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname()
  const { items, clearCart } = useCartStore();
  const handleLogout = () => {
    logout();
    setIsLoading(true);
    clearCart()
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };
  const itemCount = items.reduce((total, item) => total + item.userQuantity, 0);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-10 rounded-full font-space font-semibold"
        >
          <Avatar className="size-10">
            <AvatarFallback className="border-none">
              <User />
            </AvatarFallback>
          </Avatar>
          {itemCount > 0 && (
            <div className="absolute size-6 -top-2 -right-3 bg-red-500 flex justify-center items-center rounded-full text-white">
              {itemCount}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/cart">
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Cart</span>
            {itemCount > 0 && (
              <div className="size-2 bg-red-500 rounded-full"></div>
            )}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/orders"}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>
        {user?.role === "ADMIN" && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={user?.role === "ADMIN" ? "/dashboard" : "/dashboard"}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild onClick={handleLogout}>
          <LogoutIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
