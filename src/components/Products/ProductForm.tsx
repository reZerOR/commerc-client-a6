"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "../ui/file-upload";
import { productSchema, productUpdateSchema } from "@/lib/validation/product";
import { useGetCategory } from "@/hooks/category.hook";
import {
  TProduct,
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/product.hook";
import { TCategory } from "../Categories/CategoryTable";
type TProductProps = {
  onClose: () => void;
  product?: TProduct;
};

export default function ProductForm({ onClose, product }: TProductProps) {
  const [files, setFiles] = useState<File[] | null>(null);
  const { data: Categories, isLoading } = useGetCategory();

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };
  const form = useForm<
    z.infer<typeof productSchema | typeof productUpdateSchema>
  >({
    resolver: zodResolver(!product ? productSchema : productUpdateSchema),
    defaultValues: !product
      ? {
          title: "",
          price: "",
          quantity: "",
          description: "",
          category: "",
          image: "",
        }
      : {
          title: product?.title || "",
          price: product?.price.toString() || "",
          quantity: product?.quantity.toString() || "",
          description: product?.description || "",
          category: (product?.category as TCategory)._id || "",
        },
  });
  const {
    mutate: handleCreate,
    isSuccess: isCreateSuccess,
    isPending: isCreatePending,
  } = useCreateProduct();
  const {
    mutate: handleUpdate,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
  } = useUpdateProduct();

  function onSubmit(
    values: z.infer<typeof productSchema | typeof productUpdateSchema>
  ) {
    const ProductData = {
      title: values.title,
      category: values.category,
      description: values.description,
      price: Number(values.price),
      quantity: Number(values.quantity),
    };
    if (product) {
      handleUpdate({ id: product._id, payload: ProductData });
    } else {
      const formData = new FormData();
      formData.append("data", JSON.stringify(ProductData));
      formData.append("file", files![0]);
      handleCreate(formData);
    }
  }
  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      onClose();
      form.reset();
    }
  }, [isCreateSuccess, isUpdateSuccess]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-3xl mx-auto"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product name" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="1450" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="40" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Categories?.map((item) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Something about your product"
                  className="h-20"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {!product && (
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={dropZoneConfig}
                    className="relative bg-background rounded-lg p-2"
                  >
                    <FileInput
                      id="fileInput"
                      className="outline-dashed outline-1 outline-slate-500"
                    >
                      <div className="flex items-center justify-center flex-col p-8 w-full ">
                        <CloudUpload className="text-gray-500 w-10 h-10" />
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                          &nbsp; or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    </FileInput>
                    <FileUploaderContent>
                      {files &&
                        files.length > 0 &&
                        files.map((file, i) => (
                          <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </FileUploader>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" disabled={isCreatePending || isUpdatePending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
