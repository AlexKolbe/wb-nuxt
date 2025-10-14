import { Product } from '../../app/models/products.model';

export interface Query {
	field: keyof Product;
	name: string;
}

const getFiltredProducts = (products: Product[], query: Query) => {
	if(query.field && query.name) {
		return products.filter((c) => c[query.field] === query.name)
	}
		return products
}

export default defineEventHandler( async (event) => {
	const {field, name}: Query = getQuery(event);
	const products: Product[] = await $fetch('https://wb-nuxt-default-rtdb.firebaseio.com/data.json')
	return getFiltredProducts(products, {field, name})
})