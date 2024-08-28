import { ProductType } from "../../pages/Home";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart, removeFromCart } from "../../store/slices/cartSlice";

const ProductCard = ({ product }: { product: ProductType }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((store) => store.cart.cartItems);
  return (
    <div className="border border-zinc-600 p-4 rounded-md flex flex-col gap-4 hover:border-zinc-400 hover:bg-zinc-900">
      <div className="w-full h-80 bg-white flex items-center justify-center rounded-md overflow-hidden">
        <img
          src={product?.image}
          alt={product.title}
          className="w-full h-full object-contain object-center rounded-md"
        />
      </div>
      <h1 className="text-lg text-zinc-100">{product?.title}</h1>
      <p className="text-zinc-400">{`${product?.description.slice(
        0,
        100
      )}...`}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold">${product?.price}</span>
        <div>{product?.rating?.rate}⭐</div>
      </div>

      {cartItems.find(item => item.id === product.id) ? (
        <button
          onClick={() => dispatch(removeFromCart(product))}
          className="border border-red-600 rounded-md text-sm px-3 py-2 text-red-600 font-semibold mt-auto"
        >
          Remove from cart
        </button>
      ) : (
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-900 font-semibold mt-auto"
        >
          Add to cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
