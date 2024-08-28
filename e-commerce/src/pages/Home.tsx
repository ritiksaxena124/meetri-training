import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import client from "../utils/axios";

import { ChangeEvent, useEffect, useState } from "react";
import Cart from "../components/Cart";
import InputField from "../components/InputField";
import Pagination from "../components/Pagination";
import { PRODUCTS_LIMIT } from "../constants";

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
  productCount: number;
}

const Home: React.FC = () => {
  const [filteredData, setFilteredData] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    async function getProductsData() {
      setLoading(true);
      const { data } = await client.get(`/products`);
      const newData = data?.map((product: ProductType) => ({
        ...product,
        productCount: 0,
        price: (product.price * 83.97).toFixed(2),
      }));
      setProducts(newData);
      setLoading(false);
    }

    getProductsData();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function getData() {
      const { data } = await client.get(
        `/products?limit=${currentPage * PRODUCTS_LIMIT}`
      );

      const newData = data?.map((product: ProductType) => ({
        ...product,
        price: (product.price * 83.97).toFixed(2),
      }));

      setFilteredData(
        newData.slice(
          (currentPage - 1) * PRODUCTS_LIMIT,
          currentPage * PRODUCTS_LIMIT
        )
      );

      setLoading(false);
    }

    getData();
  }, [currentPage]);

  const filterProductsData = (category: string) => {
    if (category === "all") {
      setFilteredData(products);
    } else {
      const data = products?.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
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
      product?.title?.toLowerCase()?.includes(e.target.value.toLowerCase())
    );
    setFilteredData(
      data.slice(
        (currentPage - 1) * PRODUCTS_LIMIT,
        currentPage * PRODUCTS_LIMIT
      )
    );
    setCurrentPage(1);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full min-h-screen p-8 ">
        <div className="flex gap-8 flex-col lg:flex-row">
          <div className="space-y-8 w-full lg:w-3/4 ">
            <div className="flex items-end justify-between gap-8 flex-wrap lg:flex-nowrap">
              <div className="space-y-4 basis-1/4">
                <h2 className="text-xl text-zinc-400">Filter by category</h2>
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

              <InputField
                value={search}
                onChange={handleSearch}
                products={filteredData}
              />

              <div className="space-y-4 basis-1/2">
                <h2 className="text-xl text-zinc-400">Sort by price</h2>
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

            <div className="w-full h-[1px] bg-zinc-600" />
            {filteredData && filteredData.length === 0 ? (
              <div className="w-full h-[calc(100vh-220px)] flex items-center justify-center">
                <h1 className="text-2xl text-zinc-500">No results found!</h1>
              </div>
            ) : (
              <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredData &&
                  filteredData.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            )}
            <Pagination
              data={products}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            {/* <p className="mt-5 text-zinc-400 text-center text-xl">No more results</p> */}
          </div>
          <div className="w-full lg:w-1/4 border-t lg:border-t-0 lg:border-l border-zinc-600 py-5 lg:py-0 px-5 relative">
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
