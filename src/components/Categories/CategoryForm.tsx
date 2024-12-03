"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCategory } from "./CategoryTable";
import { useCategoryUpdate, useCreateCategory } from "@/hooks/category.hook";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});
const CategoryForm = ({
  onClose,
  category,
}: {
  onClose: () => void;
  category?: TCategory;
}) => {
  const { mutate: handleCreate, isSuccess: CreateSuccess } =
    useCreateCategory();
  const { mutate: handleUpdate, isSuccess: UpdateSuccess } =
    useCategoryUpdate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    category
      ? handleUpdate({ name: values.name, id: category._id })
      : handleCreate(values.name);
  };
  useEffect(() => {
    if (UpdateSuccess || CreateSuccess) {
      form.reset();
      onClose();
    }
  }, [UpdateSuccess, CreateSuccess]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
