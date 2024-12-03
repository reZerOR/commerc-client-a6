import AddCategory from "./AddCategory";
import CategoryTable from "./CategoryTable";

export default function CategoryManagement() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Category List</h1>
        <AddCategory />
      </div>
      <CategoryTable />
    </div>
  );
}
