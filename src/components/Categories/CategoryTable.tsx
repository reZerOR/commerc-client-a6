"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import { useGetCategory } from "@/hooks/category.hook";
export interface TCategory {
  _id: string;
  name: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export default function CategoryTable() {
  const { data: categories, isLoading } = useGetCategory();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // // console.log(categories);
  return (
    <Table>
      <TableHeader>
        <TableRow className="font-bold">
          <TableHead>Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((category) => (
          <TableRow key={category._id}>
            <TableCell className="font-semibold">{category.name}</TableCell>
            <TableCell>
              {new Date(category.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(category.updatedAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="flex gap-2">
              <EditCategory {...category} />
              <DeleteCategory id={category._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
