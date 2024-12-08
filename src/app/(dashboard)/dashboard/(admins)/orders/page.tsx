import OrderManagement from "@/components/orders/OrderManagement";

export default function Orders() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6 font-popins">
        Order Management
      </h1>
      <OrderManagement/>
    </div>
  );
}
