import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  decrementCount,
  emptyCart,
  incrementCount,
} from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useAppSelector((store) => store.cart.cartItems);
  const dispatch = useAppDispatch();
  const [payableAmt, setPayableAmt] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    let amt = 0;
    cartItems.map((item) => (amt += item.price * item.productCount));
    setPayableAmt(Number(amt.toFixed(2)));
  }, [cartItems]);
  return (
    <>
      <div className="w-full h-full lg:max-w-5xl mx-auto border-t border-zinc-600 py-8 lg:py-8 px-5 relative">
        <div className="relative h-full top-5 w-full">
          <div className="flex gap-5 mb-5 justify-between top-5 p-4 rounded-md bg-zinc-900 ">
            <div className="">
              <p className="text-lg text-zinc-400">Total payable amount</p>
              <p className="text-3xl font-semibold tracking-wide">
                ₹{payableAmt}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="border border-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-200 font-medium"
            >
              Shop more
            </button>
          </div>

          <div className="w-full space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your cart items</h2>
              <button onClick={() => dispatch(emptyCart())}>Clear</button>
            </div>
            <div className="w-full">
              {cartItems && cartItems.length === 0 ? (
                <div className="border border-dashed min-h-32 border-zinc-600 rounded-md flex items-center justify-center">
                  <p className="text-lg text-zinc-400">Your cart is empty</p>
                </div>
              ) : (
                <div className="flex h-full justify-between gap-4 flex-wrap md:flex-nowrap">
                  {cartItems.map((product) => {
                    return (
                      <>
                        <div className="h-fit md:basis-1/2 w-full border p-4 rounded-md flex flex-col gap-4">
                          <div className="w-full h-80 bg-white flex items-center justify-center rounded-md overflow-hidden">
                            <img
                              src={product?.image}
                              alt={product.title}
                              className="w-full h-full object-contain object-top rounded-md"
                            />
                          </div>
                          <h1 className="text-xl font-semibold text-zinc-100">
                            {product?.title}
                          </h1>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-semibold">
                              ₹{product?.price}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  dispatch(incrementCount(product))
                                }
                                className="px-2 bg-white rounded-md text-zinc-800 text-xl"
                              >
                                +
                              </button>
                              <span className="text-xl">
                                {product?.productCount}
                              </span>

                              <button
                                onClick={() =>
                                  dispatch(decrementCount(product))
                                }
                                className="px-2 bg-white rounded-md text-zinc-800 text-xl"
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
            <button disabled = {!(cartItems.length > 0)} className={` ${cartItems.length > 0 ? "cursor-pointer bg-zinc-200" : "cursor-not-allowed bg-zinc-500"} w-full rounded-md text-sm px-3 py-2 text-zinc-900 font-semibold`}>
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
