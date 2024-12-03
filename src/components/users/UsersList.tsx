import { Button } from "../ui/button";
import { Plus, User } from "lucide-react";
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

export default async function UserList() {
  //   const users = await UserModel.find({ isDeleted: false }).select('-password')

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        <Dialog>
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
            <CreateUserForm />
          </DialogContent>
        </Dialog>
      </div>
      <UsersTable />
    </div>
  );
}
