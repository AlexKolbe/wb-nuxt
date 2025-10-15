<template>
  <Header />
  <slot />
  <Footer />
  <Cart v-if="viewCart" />
</template>

<script setup>
const viewCart = useViewCart();
</script>
