import UserList from "@/components/users/UsersList";

export default function UsersPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <UserList />
    </div>
  );
}
