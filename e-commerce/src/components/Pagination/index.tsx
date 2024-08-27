import { PRODUCTS_LIMIT } from "../../constants";
import { ProductType } from "../../pages/Home";

const Pagination = ({
  data,
  currentPage,
  setCurrentPage,
}: {
  data: ProductType[];
  currentPage: number;
  setCurrentPage: (val: number) => void;
}) => {
  const numberOfPages = data.length / PRODUCTS_LIMIT;
  let paginationBtn: number[] = [];

  for (let i = 1; i <= numberOfPages; i++) {
    paginationBtn.push(i);
  }

  return (
    <>
      <div className="flex gap-2">
        {paginationBtn.map((btn) => (
          <button
            onClick={() => setCurrentPage(btn)}
            key={btn}
            className={`py-3 px-4 rounded-md border border-transparen ${
              currentPage === btn
                ? "bg-zinc-100 text-zinc-800"
                : "bg-zinc-700 hover:bg-zinc-800 hover:border hover:border-zinc-400"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </>
  );
};

export default Pagination;
