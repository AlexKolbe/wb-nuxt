<template>
  <Header />
  <slot />
  <Cart v-if="viewCart" />
</template>

<script setup>
const viewCart = useViewCart();
</script>
