'use client'
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

const UsersTable = () => {
  // const users = [
  //   {
  //     _id: "6382f7d7b1e3d5a1c5a4d2c1",
  //     name: "John Doe",
  //     role: "USER",
  //     email: "john.doe@example.com",
  //     password: "hashedpassword123",
  //     isDeleted: false,
  //     phoneNumber: "1234567890",
  //   },
  //   {
  //     _id: "6382f7d8b1e3d5a1c5a4d2c2",
  //     name: "Jane Smith",
  //     role: "ADMIN",
  //     email: "jane.smith@example.com",
  //     password: "hashedpassword123",
  //     isDeleted: false,
  //     phoneNumber: "9876543210",
  //   },
  //   {
  //     _id: "6382f7d9b1e3d5a1c5a4d2c3",
  //     name: "Alice Johnson",
  //     role: "USER",
  //     email: "alice.johnson@example.com",
  //     password: "hashedpassword123",
  //     isDeleted: false,
  //     phoneNumber: "5551234567",
  //   },
  //   {
  //     _id: "6382f7dab1e3d5a1c5a4d2c4",
  //     name: "Bob Brown",
  //     role: "USER",
  //     email: "bob.brown@example.com",
  //     password: "hashedpassword123",
  //     isDeleted: true,
  //     phoneNumber: "6661234567",
  //   },
  //   {
  //     _id: "6382f7dbb1e3d5a1c5a4d2c5",
  //     name: "Catherine Lee",
  //     role: "USER",
  //     email: "catherine.lee@example.com",
  //     password: "hashedpassword123",
  //     isDeleted: false,
  //     phoneNumber: "7771234567",
  //   },
  //   {
  //     _id: "6382f7dcb1e3d5a1c5a4d2c6",
  //     name: "Daniel Wilson",
  //     role: "USER",
  //     email: "daniel.wilson@example.com",
  //     password: "hashedpassword123",
  //     isDeleted: false,
  //     phoneNumber: "8881234567",
  //   },
  //   {
  //     _id: "6382f7ddb1e3d5a1c5a4d2c7",
  //     name: "Emily Davis",
  //     role: "USER",
  //     email: "emily.davis@example.com",
  //     password: "hashedpassword123",
  //     isDeleted: false,
  //     phoneNumber: "9991234567",
  //   },
  //   {
  //     _id: "6382f7deb1e3d5a1c5a4d2c8",
  //     name: "Frank Harris",
  //     role: "USER",
  //     email: "frank.harris@example.com",
  //     password: "hashedpassword123",
  //     isDeleted: true,
  //     phoneNumber: "4441234567",
  //   },
  //   {
  //     _id: "6382f7dfb1e3d5a1c5a4d2c9",
  //     name: "Grace Miller",
  //     role: "USER",
  //     email: "grace.miller@example.com",
  //     password: "hashedpassword123",
  //     isDeleted: false,
  //     phoneNumber: "3331234567",
  //   },
  //   {
  //     _id: "6382f7e0b1e3d5a1c5a4d2ca",
  //     name: "Henry Adams",
  //     role: "ADMIN",
  //     email: "henry.adams@example.com",
  //     password: "hashedpassword123",
  //     isDeleted: false,
  //     phoneNumber: "2221234567",
  //   },
  // ];
  const { data: users } = useGetUsers();
  console.log(users);
  
  return (
    <Table>
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
            <TableCell>
              <Link
                href={`/users/${user._id}`}
                className="text-blue-600 hover:text-blue-800 mr-2"
              >
                Edit
              </Link>
              <DeleteUserButton userId={user._id!} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
