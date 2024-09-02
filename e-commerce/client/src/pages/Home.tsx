import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import client from "../utils/axios";

import { ChangeEvent, useDeferredValue, useEffect, useState } from "react";
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
  const [currentItems, setCurrentItems] = useState<ProductType[]>([]);
  const [cachedData, setCachedData] = useState<{
    [key: number]: ProductType[];
  }>({});
  const [currCategory, setCurrCategory] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<string>("LOW_TO_HIGH");
  useEffect(() => {
    async function getProductsData() {
      setLoading(true);
      if (currCategory === "all") {
        const { data } = await client.get(`/products`);
        const newData = data?.map((product: ProductType) => ({
          ...product,
          productCount: 0,
          price: (product.price * 83.97).toFixed(2),
        }));
        setProducts(newData);
        setFilteredData(newData);
        setCachedData((prevState) => ({
          ...prevState,
          [currentPage]: newData.slice(
            currentPage * PRODUCTS_LIMIT - PRODUCTS_LIMIT,
            currentPage * PRODUCTS_LIMIT
          ),
        }));
        setCurrentItems(
          newData.slice(
            currentPage * PRODUCTS_LIMIT - PRODUCTS_LIMIT,
            currentPage * PRODUCTS_LIMIT
          )
        );
      } else {
        const { data } = await client.get(`/products/category/${currCategory}`);
        const newData = data?.map((product: ProductType) => ({
          ...product,
          productCount: 0,
          price: (product.price * 83.97).toFixed(2),
        }));
        setProducts(newData);
        setCurrentPage(1);
        setFilteredData(newData);
        setCurrentItems(
          newData.slice(
            currentPage * PRODUCTS_LIMIT - PRODUCTS_LIMIT,
            currentPage * PRODUCTS_LIMIT
          )
        );
      }

      setLoading(false);
    }

    getProductsData();
  }, [currCategory]);

  async function getData() {
    setLoading(true);
    const { data } = await client.get(
      `/products?limit=${currentPage * PRODUCTS_LIMIT}`
    );

    const newData = data?.map((product: ProductType) => ({
      ...product,
      price: (product.price * 83.97).toFixed(2),
    }));

    setCurrentItems(
      newData.slice(
        (currentPage - 1) * PRODUCTS_LIMIT,
        currentPage * PRODUCTS_LIMIT
      )
    );

    setCachedData((prevState) => ({
      ...prevState,
      [currentPage]: newData.slice(
        (currentPage - 1) * PRODUCTS_LIMIT,
        currentPage * PRODUCTS_LIMIT
      ),
    }));

    setLoading(false);
  }

  useEffect(() => {
    if (currCategory !== "all") {
      setCurrentItems(
        products.slice(
          (currentPage - 1) * PRODUCTS_LIMIT,
          currentPage * PRODUCTS_LIMIT
        )
      );
    } else if (!search) {
      if (cachedData[currentPage]) {
        let data;
        if (priceSort === "LOW_TO_HIGH") {
          data = Object.values(cachedData)
            .flat()
            .sort(
              (product1: ProductType, product2: ProductType) =>
                product1.price - product2.price
            );
        } else {
          data = Object.values(cachedData)
            .flat()
            .sort(
              (product1: ProductType, product2: ProductType) =>
                product2.price - product1.price
            );
        }
        console.log(data);
        setCurrentItems(
          data.slice(
            (currentPage - 1) * PRODUCTS_LIMIT,
            currentPage * PRODUCTS_LIMIT
          )
        );
      } else {
        getData();
      }
    }
    // }
  }, [currentPage]);

  useEffect(() => {
    const filtered = products?.filter((product) =>
      product?.title?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    if (PRODUCTS_LIMIT * currentPage > filtered?.length) {
      setCurrentPage(1);
    }
  }, [search]);

  // const filterProductsData = (category: string) => {
  //   if (category === "all") {
  //     setCurrentPage(1);

  //     setCurrentItems(
  //       products.slice(
  //         currentPage * PRODUCTS_LIMIT - PRODUCTS_LIMIT,
  //         PRODUCTS_LIMIT * currentPage
  //       )
  //     );
  //   } else {
  //     const data = products?.filter(
  //       (product) => product.category.toLowerCase() === category.toLowerCase()
  //     );
  //     setFilteredData(data);
  //     setCurrentItems(
  //       data.slice(
  //         currentPage * PRODUCTS_LIMIT - PRODUCTS_LIMIT,
  //         PRODUCTS_LIMIT * currentPage
  //       )
  //     );
  //   }
  //   setCurrentPage(1);
  // };

  const sortByPrice = (type: string) => {
    switch (type) {
      case "LOW_TO_HIGH":
        if (search) {
          filteredData?.sort(
            (product1, product2) => product1.price - product2.price
          );
          setFilteredData([...filteredData]);
        } else if (currCategory !== "all") {
          products?.sort(
            (product1, product2) => product1.price - product2.price
          );
          setCurrentItems([...products].slice(
            (currentPage - 1) * PRODUCTS_LIMIT,
            currentPage * PRODUCTS_LIMIT
          ));
        } else {
          const sortedDatainAscOrder = Object.values(cachedData)
            .flat()
            .sort(
              (product1: ProductType, product2: ProductType) =>
                product1.price - product2.price
            );

          setCurrentItems(
            sortedDatainAscOrder.slice(
              (currentPage - 1) * PRODUCTS_LIMIT,
              currentPage * PRODUCTS_LIMIT
            )
          );
        }
        break;

      case "HIGH_TO_LOW":
        if (search ) {
          filteredData?.sort(
            (product1, product2) => product2.price - product1.price
          );
          setFilteredData([...filteredData]);
        } else if (currCategory !== "all") {
          products?.sort(
            (product1, product2) => product2.price - product1.price
          );
          setCurrentItems([...products].slice(
            (currentPage - 1) * PRODUCTS_LIMIT,
            currentPage * PRODUCTS_LIMIT
          ));
        } else {
          const sortedDatainDescOrder = Object.values(cachedData)
            .flat()
            .sort((product1, product2) => product2.price - product1.price);

          console.log(sortedDatainDescOrder);
          setCurrentItems(
            sortedDatainDescOrder.slice(
              (currentPage - 1) * PRODUCTS_LIMIT,
              currentPage * PRODUCTS_LIMIT
            )
          );
        }
        break;
      default:
        console.log("error sorting products by price");
        break;
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return <Loader />;
  }

  const itemsToDisplay = search
    ? filteredData.slice(
        (currentPage - 1) * PRODUCTS_LIMIT,
        currentPage * PRODUCTS_LIMIT
      )
    : currentItems;

  return (
    <>
      <div className="w-full max-w-5xl min-h-screen p-4 mx-auto">
        <div className="flex gap-8 flex-col lg:flex-row">
          <div className="space-y-8 w-full ">
            <div className="flex items-end justify-between gap-8 flex-wrap lg:flex-nowrap">
              {/* Filter by category */}
              <div className="space-y-4 basis-1/4">
                <h2 className="text-xl text-zinc-400">Filter by category</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrCategory("all")}
                    className={`border ${
                      currCategory === "all" ? "bg-zinc-700" : ""
                    } border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setCurrCategory("men's clothing")}
                    className={`border ${
                      currCategory === "men's clothing" ? "bg-zinc-700" : ""
                    } border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium`}
                  >
                    Clothes
                  </button>

                  <button
                    onClick={() => setCurrCategory("electronics")}
                    className={`border ${
                      currCategory === "electronics" ? "bg-zinc-700" : ""
                    } border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium`}
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

              {/* Filter by price */}
              <div className="space-y-4 basis-1/2">
                <h2 className="text-xl text-zinc-400">Sort by price</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      sortByPrice("LOW_TO_HIGH");
                      setPriceSort("LOW_TO_HIGH");
                    }}
                    className="border border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium"
                  >
                    Low to High
                  </button>
                  <button
                    onClick={() => {
                      sortByPrice("HIGH_TO_LOW");
                      setPriceSort("HIGH_TO_LOW");
                    }}
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
                {itemsToDisplay &&
                  itemsToDisplay.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            )}
            <Pagination
              data={search ? filteredData : products}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          {/* <div className="w-full lg:w-1/4 border-t lg:border-t-0 lg:border-l border-zinc-600 py-5 lg:py-0 px-5 relative">
            <Cart />
          </div> */}
        </div>
      </div>
      
    </>
  );
};

export default Home;
