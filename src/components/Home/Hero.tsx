import { ArrowBigRight, ArrowRight } from "lucide-react";
import Container from "../shared/Container";
import { FlipWords } from "../ui/FlipWords";
import ProductCarousel from "./ProductCarousel";
import Link from "next/link";

const Hero = () => {
  const words = ["Comfortable", "Stylish", "Durable"];
  return (
    <div className="bg-red-500/5">
      <Container>
        <div className="lg:py-40 pt-20 flex flex-col lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-6xl font-popins font-bold leading-[125%]">
              Discover{" "}
              <FlipWords
                words={words}
                className="text-4xl md:text-6xl font- font-bold text-red-500"
              />{" "}
              <br />
              Shoes that <br /> Keep you Moving
            </h1>
            <p className="font-medium text-sm md:text-base mt-4 mb-7">
              - With <span className="font-popins text-red-500">Spiralcom</span>
            </p>
            <Link href={'/products'}>
              <button className="bg-red-500 font-popins text-base md:text-xl group w-full md:w-auto justify-center items-center text-white md:py-4 py-2 px-10 flex gap-2 rounded-xl">
                Shop Now{" "}
                <ArrowRight className="group-hover:translate-x-2 transition-all duration-500" />
              </button>
            </Link>
          </div>
          <div className="lg:w-1/2">
            <ProductCarousel />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
