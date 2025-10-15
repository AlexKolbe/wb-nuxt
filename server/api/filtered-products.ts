import { Product } from "~/models/products.model";
export interface Query {
  field: keyof Product;
  name: string;
}

const getFilteredProducts = (products: Product[], query: Query) => {
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
  // https://wb-nuxt-default-rtdb.firebaseio.com/data.json

  const { field, name }: Query = getQuery(event);
  const products: Product[] = await $fetch(
    "https://wb-nuxt-default-rtdb.firebaseio.com/data.json"
  );
  // await new Promise(resolve => setTimeout(resolve, 1000));
  return getFilteredProducts(products, { field: field, name: name });
});
