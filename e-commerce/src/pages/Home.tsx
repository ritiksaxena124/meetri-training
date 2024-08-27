import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import client from "../utils/axios";

import { ChangeEvent, useEffect, useState } from "react";
import { addToCart, emptyCart } from "../store/slices/cartSlice";

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
  const [filteredData, setFilteredData] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function getProductsData() {
      setLoading(true);
      const { data } = await client.get("/products");
      setProducts(data);
      setFilteredData(data);
      setLoading(false);

      console.log(data);
    }

    getProductsData();
  }, []);

  const filterProductsData = (category: string) => {
    if (category === "all") {
      setFilteredData(products);
    } else {
      const data = products?.filter((product) => product.category.toLowerCase() === category.toLowerCase());
      setFilteredData(data);
    }
  };

  const sortByPrice = (type: string) => {
    switch (type) {
      case "LOW_TO_HIGH":
        filteredData?.sort(
          (product1, product2) => product1.price - product2.price
        );
        setFilteredData([...filteredData]);
        break;

      case "HIGH_TO_LOW":
        filteredData?.sort(
          (product1, product2) => product2.price - product1.price
        );
        setFilteredData([...filteredData]);
        break;
      default:
        console.log("error sorting products by price");
        break;
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const data = products?.filter((product) =>
      product?.title?.toLowerCase()?.includes(e.target.value)
    );
    setFilteredData(data);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full min-h-screen p-8 space-y-8">
        <div className="flex items-end justify-between gap-8">
          <div className="space-y-4 basis-1/4">
            <h2 className="text-xl">Filter by category</h2>
            <div className="flex gap-4">
              <button
                onClick={() => filterProductsData("all")}
                className="border border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium"
              >
                All
              </button>
              <button
                onClick={() => filterProductsData("men's clothing")}
                className="border border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium"
              >
                Clothes
              </button>

              <button
                onClick={() => filterProductsData("electronics")}
                className="border border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium"
              >
                Electronics
              </button>
            </div>
          </div>

          <div className="flex border border-zinc-600 rounded-md py-2 px-3 w-full">
            <input
              type="text"
              name="search"
              className="outline-none p-2 rounded-md indent w-full"
              autoFocus
              placeholder="Search product"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="space-y-4 basis-1/4">
            <h2 className="text-xl">Sort by price</h2>
            <div className="flex gap-4">
              <button
                onClick={() => sortByPrice("LOW_TO_HIGH")}
                className="border border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium"
              >
                Low to High
              </button>
              <button
                onClick={() => sortByPrice("HIGH_TO_LOW")}
                className="border border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium"
              >
                High to Low
              </button>
            </div>
          </div>
        </div>

        <hr />
        {filteredData && filteredData.length === 0 ? (
          <div className="w-full h-[calc(100vh-220px)] flex items-center justify-center">
            <h1 className="text-2xl text-zinc-500">No results found!</h1>
          </div>
        ) : (
          <div className="flex gap-4 basis-1/4 flex-wrap mx-auto justify-center">
            {filteredData &&
              filteredData.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
