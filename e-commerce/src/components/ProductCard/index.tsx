import { ProductType } from "../../pages/Home";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="max-w-sm border p-4 rounded-md space-y-4">
      <h1 className="text-lg text-zinc-100">{product?.title}</h1>
      <p className="text-zinc-400">
        {`${product?.description?.substr(0, 100)}...`}...
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold">${product.price}</span>
        <div>{product.rating.rate}⭐</div>
      </div>
    </div>
  );
};

export default ProductCard;
