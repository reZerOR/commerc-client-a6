import Hero from "@/components/Home/Hero";
import NewProducts from "@/components/Products/NewProducts";
import ProductList from "@/components/Products/ProductList";
import Container from "@/components/shared/Container";

export default function Home() {
  return (
    <div>
      <Hero />
      <Container className="py-10">
        <h1 className="font-popins font-semibold py-5 text-3xl text-center">
          Products
        </h1>
        <ProductList />

        <div>
          <h1 className="font-popins font-semibold py-5 text-3xl text-center">
            New Arrival
          </h1>
          <NewProducts />
        </div>
      </Container>
    </div>
  );
}
