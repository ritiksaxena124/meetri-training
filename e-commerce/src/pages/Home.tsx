import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import client from "../utils/axios";

import { useEffect, useState } from "react";

export interface ProductType {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getProductsData(setProducts: (val: ProductType[]) => void) {
    setLoading(true);
    const response = await client.get("/products");
    setProducts(response?.data);
    setLoading(false);
    console.log(response.data);
  }

  useEffect(() => {
    getProductsData(setProducts);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full min-h-screen p-8 space-y-8">
        <div className="flex gap-4 basis-1/4 flex-wrap mx-auto justify-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
