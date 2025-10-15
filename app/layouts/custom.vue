<script setup lang="ts">
import Cart from "~/components/Cart.vue";

const viewCart = useViewCart();

// Для отладки
// console.log('viewCart:', viewCart.value)
</script>

<template>
  <Header />
  <slot />

  <!-- <div>ViewCart value: {{ viewCart }}</div> -->

  <!-- <client-only> -->
  <Cart v-if="viewCart" />
  <!-- </client-only> -->
</template>
