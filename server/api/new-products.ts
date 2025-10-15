import {IProduct} from '~/models/products.model'

const getNewProducts = (products: IProduct[]) => {
  return products.filter(c => c.label.toLowerCase() === 'new').splice(0, 4)
}

export default defineEventHandler(async event => {
  const products: IProduct[] = await $fetch('https://wildberries-data-16ab3-default-rtdb.firebaseio.com/db.json')

  return getNewProducts(products)
})
