import ProductList from "@/components/Products/ProductList";
import Container from "@/components/shared/Container";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Spiralcom | Products",
  description:
    "Discover the best shopping experience with SpiralCom. Explore a wide range of products, fashion, home essentials, and more. Shop now and enjoy great deals and fast shipping!",
};

const Products = () => {
  return (
    <Container>
      <h1 className="text-center font-popins text-4xl font-semibold my-10">
        Products
      </h1>
      <ProductList/>
    </Container>
  );
};

export default Products;
