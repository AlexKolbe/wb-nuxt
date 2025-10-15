<script setup lang="ts">
import Cart from "~/components/Cart.vue";
const viewCart = useViewCart();
</script>

<template>
  <!-- <client-only> -->
  <Header />

  <slot />

  <Footer />
  <Cart v-if="viewCart" />

  <!-- <Cart v-if="false" /> -->
  <!-- </client-only> -->
</template>
