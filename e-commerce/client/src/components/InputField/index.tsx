import { ChangeEvent, useState } from "react";
import { ProductType } from "../../pages/Home";
import { Link } from "react-router-dom";

const InputField = ({
  value,
  onChange,
  products,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  products: ProductType[];
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <div className="w-full relative">
      <input
        type="text"
        name="search"
        className="bg-zinc-800 outline-none p-2 border focus:border-zinc-400 rounded-md indent w-full  border-zinc-600 py-2 px-3"
        autoFocus
        placeholder="Search product"
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div className={`bg-zinc-800 p-2 rounded-md mt-2 absolute w-full ${(value && products?.length > 0 && focus) ? "block" : "hidden"}`}>
        {value && products?.slice(0, 5)?.map((product) => (
          <Link to={`/product/${product?.id}`}>
          <p key={product.id} className="bg-transparent p-2 border-b border-zinc-600 hover:bg-zinc-900 cursor-pointer">
            {product.title}
          </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InputField;
