"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUser } from "@/context/user.provider";
import Image from "next/image";
import { AvatarDropdown } from "./AvatarDropdown";
import Container from "./Container";

const routes = [{name: 'Home', path: '/'}, { name: "Products", path: "/products" }];

export function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <header className="border-b">
      <Container>
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            <Image src={"/logo.svg"} alt="logo" width={78} height={30} />
            <div className="flex gap-2">
              <NavigationMenu>
                <NavigationMenuList>
                  {routes.map((route) => (
                    <NavigationMenuItem key={route.path}>
                      <Link href={route.path} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                          active={pathname === route.path}
                        >
                          {route.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              {user ? (
                <AvatarDropdown />
              ) : (
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
