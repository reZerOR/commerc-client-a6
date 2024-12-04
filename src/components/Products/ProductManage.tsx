import AddProduct from "./AddProduct";

export default function ProductManagement() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Product List</h1>
        <AddProduct />
      </div>
      {/* <CategoryTable /> */}
    </div>
  );
}
