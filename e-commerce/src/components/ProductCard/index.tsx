import { ProductType } from "../../pages/Home";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="max-w-md border p-4 rounded-md space-y-4 flex flex-col gap-4">
      <h1 className="text-lg text-zinc-100">{product?.title}</h1>
      <p className="text-zinc-400 h-full">{`${product?.description.slice(0, 100)}...`}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold">${product?.price}</span>
        <div>{product?.rating?.rate}⭐</div>
      </div>

      <div>
        <button className="bg-zinc-200 rounded-md text-sm px-3 py-2 text-zinc-900 font-medium mt-auto">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
