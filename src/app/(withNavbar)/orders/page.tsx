import UserOrderTable from "@/components/orders/UserOrderTable";
import Container from "@/components/shared/Container";

const Orders = () => {
  return (
    <Container className="min-h-[calc(100vh-64px)]">
      <h1 className="text-3xl font-semibold font-popins py-10 md:py-20 text-center">
        Orders History
      </h1>
      <UserOrderTable />
    </Container>
  );
};

export default Orders;
