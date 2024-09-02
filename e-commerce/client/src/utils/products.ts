import { ProductType } from "../pages/Home";

export const updateProductsData = (products: ProductType[]) => {
  // TODO: Remove any type and use something meaningful
  let result: any = new Map();
  for (let i = 0; i < products.length; i++) {
    let category = products[i]?.category;
    if (!result.has(category)) {
      result[category] = [products[i]];
    } else {
      result[category].push(products[i]);
    }
  }
  return result;
};
