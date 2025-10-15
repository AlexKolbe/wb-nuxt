import { IProduct } from "~/models/products.model";

export interface IQuery {
  field: keyof IProduct;
  name: string;
}

const getFilteredProducts = (products: IProduct[], query: IQuery) => {
  if (query.field && query.name) {
    return products.filter((c) => {
      const key = c[query.field];

      if (typeof key === "string") {
        return key.toLowerCase() === query.name.toLowerCase();
      } else {
        return c[query.field] === query.name;
      }
    });
  } else {
    return products;
  }
};

export default defineEventHandler(async (event) => {
  const { field, name }: IQuery = getQuery(event);
  const products: IProduct[] = await $fetch(
    "https://wildberries-data-16ab3-default-rtdb.firebaseio.com/db.json"
  );

  return getFilteredProducts(products, { field, name });
});
