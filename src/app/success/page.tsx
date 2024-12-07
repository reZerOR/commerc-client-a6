"use client";
import { useParams } from "next/navigation";

const Success = () => {
  const param = useParams();
  console.log(param);

  return <div>Success page</div>;
};

export default Success;
