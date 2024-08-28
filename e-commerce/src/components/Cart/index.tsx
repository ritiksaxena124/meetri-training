import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  decrementCount,
  emptyCart,
  incrementCount,
} from "../../store/slices/cartSlice";

const Cart = () => {
  const cartItems = useAppSelector((store) => store.cart.cartItems);
  const dispatch = useAppDispatch();
  const [payableAmt, setPayableAmt] = useState<number>(0);
  useEffect(() => {
    let amt = 0;
    cartItems.map((item) => (amt += item.price * item.productCount));
    setPayableAmt(Number(amt.toFixed(2)));
  }, [cartItems]);
  return (
    <>
      <div className="relative h-full top-5 w-full">
        <div className="top-5 p-4 rounded-md bg-zinc-900 mb-5 w-full">
          <p className="text-lg text-zinc-400">Total payable amount</p>
          <p className="text-3xl font-semibold tracking-wide">₹{payableAmt}</p>
        </div>
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your cart items</h2>
            <button onClick={() => dispatch(emptyCart())}>Clear</button>
          </div>
          <div className="w-full mt-8">
            {cartItems && cartItems.length === 0 ? (
              <div className="border border-dashed min-h-32 border-zinc-600 rounded-md flex items-center justify-center">
                <p className="text-lg text-zinc-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {cartItems.map((product) => {
                  return (
                    <>
                      <div className="max-w-md border p-4 rounded-md flex flex-col gap-4">
                        <div className="w-full h-32 bg-white flex items-center justify-center rounded-md overflow-hidden">
                          <img
                            src={product?.image}
                            alt={product.title}
                            className="w-full h-full object-contain object-top rounded-md"
                          />
                        </div>
                        <h1 className="text-lg text-zinc-100">
                          {product?.title}
                        </h1>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-semibold">
                            ₹{product?.price}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => dispatch(incrementCount(product))}
                              className="px-2 bg-white rounded-md text-zinc-800 text-xl"
                            >
                              +
                            </button>
                            <span className="text-xl">
                              {product?.productCount}
                            </span>

                            <button
                              onClick={() => dispatch(decrementCount(product))}
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
        </div>
      </div>
    </>
  );
};

export default Cart;
