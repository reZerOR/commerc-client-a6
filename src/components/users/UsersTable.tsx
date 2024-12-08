"use client";
import Link from "next/link";
import DeleteUserButton from "./DeleteUserButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUsers } from "@/hooks/user.hook";
import { Edit } from "lucide-react";
import EditUserForm from "./EditUser";

const UsersTable = () => {
  const { data: users, isLoading } = useGetUsers();
  // console.log(users);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Table className="w-full">
      <TableCaption>A list of all users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.name}</TableCell>
            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="flex">
              <EditUserForm user={user} />
              <DeleteUserButton userId={user._id!} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
