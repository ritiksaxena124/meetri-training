import { Link } from "react-router-dom";
import { ProductType } from "../../pages/Home";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ProductCard = ({ product }: { product: ProductType }) => {
  // const dispatch = useAppDispatch();
  // const cartItems = useAppSelector((store) => store.cart.cartItems);
  console.log(product)
  return (
    <div className="border border-zinc-600 p-4 rounded-md flex flex-col gap-4 hover:border-zinc-400 hover:bg-zinc-900">
      <Link to={`/product/${product.id}`} className="space-y-4">
        <div className="w-full h-80 bg-white flex items-center justify-center rounded-md overflow-hidden">
          <img
            src={product?.images[0]}
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
          <span className="text-xl font-semibold">₹{product?.price}</span>
          <div>{product?.rating?.rate}⭐</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
