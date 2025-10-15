<template>
  <div class="overlay show" id="modal-cart">
    <div class="modal">
      <header class="modal-header">
        <h2 class="modal-title">Cart</h2>
        <button class="modal-close" @click="closeCart()">x</button>
      </header>
      <table class="cart-table">
        <colgroup>
          <col class="col-goods" />
          <col class="col-price" />
          <col class="col-minus" />
          <col class="col-qty" />
          <col class="col-plus" />
          <col class="col-total-price" />
          <col class="col-delete" />
        </colgroup>
        <thead>
          <tr>
            <th>Good(s)</th>
            <th>Price</th>
            <th colspan="3">Qty.</th>
            <th colspan="2">Total</th>
          </tr>
        </thead>
        <tbody class="cart-table__goods" v-if="total != 0">
          <tr class="cart-item" v-for="item in cart" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}$</td>
            <td>
              <button
                class="cart-btn-minus"
                :disabled="item.count <= 1"
                @click="decrease(item)"
              >
                -
              </button>
            </td>
            <td>{{ item.count }}</td>
            <td>
              <button class="cart-btn-plus" @click="increase(item)">+</button>
            </td>
            <td>{{ item.price * item.count }}$</td>
            <td>
              <button class="cart-btn-delete" @click="remove(item)">x</button>
            </td>
          </tr>
        </tbody>
        <tbody class="cart-table__goods" :class="$style.center" v-else>
          <td colspan="7">
            <h3 class="modal-title" :class="$style.center">Корзина пуста</h3>
          </td>
        </tbody>
        <tfoot>
          <tr v-if="total != 0">
            <th colspan=" 5">Total:</th>
            <th class="card-table__total" colspan="2">{{ total }}$</th>
          </tr>
        </tfoot>
      </table>

      <form class="modal-form" action="">
        <input
          class="modal-input name"
          type="text"
          placeholder="Имя"
          name="nameCustomer"
        />
        <input
          class="modal-input phone"
          type="text"
          placeholder="Телефон"
          name="phoneCustomer"
        />
        <button class="button cart-buy" type="submit">
          <span class="button-text">Checkout</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart, useViewCart } from "../composables/states";
import type { ICartItem } from "../models/cart-item.model";

const viewCart = useViewCart();
const cart = useCart();
const total = computed(() =>
  cart.value.reduce((sum: number, item: { price: number; count: number }) => {
    return sum + item.price * item.count;
  }, 0)
);
console.log(cart.value.length);

const closeCart = () => {
  viewCart.value = false;
};
const increase = (item: ICartItem) => {
  const findItem = cart.value.find((c) => c.id === item.id);
  if (findItem) {
    item.count++;
  }
};
const decrease = (item: ICartItem) => {
  const findItem = cart.value.find((c) => c.id === item.id);
  if (findItem) {
    item.count--;
  }
};
const remove = (item: ICartItem) => {
  cart.value = cart.value.filter((c) => c.id !== item.id);
};
</script>

<style module>
.center {
  text-align: center;
}
</style>
