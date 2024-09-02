import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../utils/axios";
import { ProductType } from "./Home";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addToCart,
  decrementCount,
  incrementCount,
} from "../store/slices/cartSlice";
import Loader from "../components/Loader";

async function getData({
  id,
  setProduct,
}: {
  id: string;
  setProduct: (val: ProductType) => void;
}) {
  const { data }: { data: ProductType } = await client.get(`/products/${id}`);
  data.price = Number((data.price * 83.97).toFixed(2));
  data.productCount = 0;
  setProduct(data);
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();
  const cartItems = useAppSelector((store) => store.cart.cartItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [totalItemsInCart, setTotalItemsInCart] = useState<number>(0);
  useEffect(() => {
    try {
      if (id) {
        getData({ id, setProduct });
      } else {
        console.log("wrong id", id);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      setTotalItemsInCart(0);
    } else {
      let totalItems = 0;
      cartItems.map((item) =>
        setTotalItemsInCart(totalItems + item.productCount)
      );
    }
  }, [cartItems]);
  if (!product) {
    return <Loader />;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto h-full p-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="border border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium"
          >
            Shop more
          </button>
          <Link to="/cart">
          <span className="relative flex items-center gap-2">
            <span className="font-medium text-xl">Cart </span>
            
<svg fill="#fff" version="1.1" id="Capa_1" width="24" height="24" viewBox="0 0 494.67 494.67">
<g>
	<path d="M421.621,116.048h-56.939v-3.735C364.682,50.383,314.299,0,252.369,0h-9.45c-61.93,0-112.313,50.384-112.313,112.313v3.735
		H73.049c-8.297,0-15.026,6.727-15.026,15.025v348.572c0,8.299,6.729,15.025,15.026,15.025h348.572
		c8.299,0,15.025-6.728,15.025-15.025V131.073C436.648,122.774,429.92,116.048,421.621,116.048z M166.073,112.313
		c0-42.372,34.473-76.846,76.846-76.846h9.45c42.373,0,76.695,34.474,76.695,76.846l-0.021,36.722
		c0,9.792-7.838,17.729-17.629,17.729c-9.793,0-17.729-7.938-17.729-17.729c0-0.041,0.008-0.082,0.008-0.123l-0.019-32.863h-92.147
		v32.863h-0.006c0,0.041,0.006,0.082,0.006,0.123c0,9.792-7.938,17.729-17.729,17.729c-9.792,0-17.729-7.938-17.729-17.729
		L166.073,112.313z"/>
</g>
</svg>{" "}
            {totalItemsInCart === 0 ? (
              ""
            ) : (
              <span className="py-1 px-2.5 text-sm rounded-full bg-red-600 absolute -top-3 -right-3">
                {totalItemsInCart}
              </span>
            )}
          </span>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="w-[400px] h-[500px] bg-white rounded-md overflow-hidden">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-1/2 flex flex-col ">
            <div className="space-y-8">
              <h1 className="text-3xl font-semibold">{product?.title}</h1>
              <p className="text-zinc-400">{product?.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">
                  ₹{product?.price}
                </span>
                <span className="text-xl">{product?.rating?.rate}⭐</span>
              </div>
            </div>
            <div className="space-y-8 mt-auto">
              <div className="flex gap-24 mt-auto items-center justify-between w-full">
                {cartItems.find((item) => item.id === product?.id) ? (
                  <>
                    <button
                      onClick={() => dispatch(incrementCount(product))}
                      className="w-full border border-zinc-200 text-xl  rounded-md leading-none px-3 py-2 text-zinc-200 font-medium"
                    >
                      +
                    </button>
                    <span className="text-3xl">
                      {JSON.stringify(
                        cartItems.filter((item) => item?.id === product?.id)[0]
                          ?.productCount
                      ).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => dispatch(decrementCount(product))}
                      className="w-full border border-zinc-200  text-xl rounded-md leading-none px-3 py-2 text-zinc-200 font-medium"
                    >
                      -
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="w-full border border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium"
                  >
                    Add to cart
                  </button>
                )}
              </div>
              <button
                onClick={() => navigate("/cart")}
                className="bg-zinc-200 w-full rounded-md text-sm px-3 py-2 text-zinc-900 font-semibold mt-auto"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
