"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUserSchema, updateUserSchema } from "@/lib/validation/auth";
import { TUser, useCreateUser, useUpdateUser } from "@/hooks/user.hook";
import { toast } from "sonner";

type Props = {
  setOpen: React.Dispatch<boolean>;
  user?: TUser | null;
};

export default function UserForm({ setOpen, user }: Props) {
  const form = useForm<
    z.infer<typeof createUserSchema | typeof updateUserSchema>
  >({
    resolver: zodResolver(!user ? createUserSchema : updateUserSchema),
    defaultValues: user
      ? {
          name: user?.name || "",
          email: user?.email || "",
          role: user?.role || "USER",
          phoneNumber: user?.phoneNumber || "",
        }
      : {
          name: "",
          email: "",
          role: "USER",
          password: "",
          phoneNumber: "",
        },
  });

  const {
    mutate: handleCreateUser,
    isSuccess: isCreateSuccess,
    isPending: isCreatePending,
  } = useCreateUser();
  const {
    mutate: handleUpdateUser,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
  } = useUpdateUser();

  async function onSubmit(
    values: z.infer<typeof createUserSchema | typeof updateUserSchema>
  ) {
    if (user) {
      console.log("hello");

      handleUpdateUser({
        id: user._id!,
        payload: {
          name: values.name,
          phoneNumber: values.phoneNumber,
          role: values.role,
        },
      });
    } else {
      handleCreateUser(values as TUser & { password: string });
    }
  }

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      setOpen(false);
      form.reset();
    }
  }, [isCreateSuccess, isUpdateSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  readOnly={!!user}
                  placeholder="john@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!user && ( // Only show password field when creating a new user
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            className="mt-4"
            disabled={isCreatePending || isUpdatePending}
          >
            {isCreatePending || isUpdatePending
              ? "Submitting..."
              : user
              ? "Update"
              : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
