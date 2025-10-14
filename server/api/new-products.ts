import { Product } from '../../app/models/products.model'

const getNewProducts = (products: Product[]) => {
	return products.filter((c) => c.label.toLowerCase() === 'new').splice(0, 4)
}

export default defineEventHandler( async (event) => {
	// https://wb-nuxt-default-rtdb.firebaseio.com/data.json
 	const products: Product[] = await $fetch('https://wb-nuxt-default-rtdb.firebaseio.com/data.json')
	
// await new Promise(resolve => setTimeout(resolve, 3000));
  return getNewProducts(products)
})