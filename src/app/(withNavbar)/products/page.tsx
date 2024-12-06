import ProductList from "@/components/Products/ProductList";
import Container from "@/components/shared/Container";

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
