"use client";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CreateUserForm from "./CreateUserForm";
import UsersTable from "./UsersTable";
import { useState } from "react";

export default function UserList() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-8 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <CreateUserForm setOpen={setOpen}/>
          </DialogContent>
        </Dialog>
      </div>
      <UsersTable />
    </div>
  );
}
