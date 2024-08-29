import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../utils/axios";
import { ProductType } from "./Home";

async function getData({
  id,
  setProduct,
}: {
  id: string;
  setProduct: (val: ProductType) => void;
}) {
  const { data } = await client.get(`/products/${id}`);
  console.log(data);
  setProduct(data);
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();
  useEffect(() => {
    try {
        if(id) {
            getData({id, setProduct})
        }else {
            console.log("wrong id", id)
        }
      ;
    } catch (error) {
        console.log(error)
    }
  }, []);
  return <h1>{product?.title}</h1>;
};

export default ProductPage;
