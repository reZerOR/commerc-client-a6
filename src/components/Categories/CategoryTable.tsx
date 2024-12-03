"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
export interface TCategory {
  _id: string;
  name: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const CategoryTable = () => {
  const [categories, setCategories] = useState<TCategory[]>([
    {
      _id: "1",
      name: "Electronics",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "2",
      name: "Books",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
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
        {categories.map((category) => (
          <TableRow key={category._id}>
            <TableCell className="font-semibold">{category.name}</TableCell>
            <TableCell>{category.createdAt.toLocaleDateString()}</TableCell>
            <TableCell>{category.updatedAt.toLocaleDateString()}</TableCell>
            <TableCell className="flex gap-2">
              <EditCategory {...category} />
              <DeleteCategory id={category._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
