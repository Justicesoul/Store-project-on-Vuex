<template>
  <div class="product">
    <h2>{{ product.category }}</h2>
    <h3>{{ product.title }}</h3>
    <img class="product__image" :src="product.image" alt="" />
    <h6>{{ product.description }}</h6>
    <div class="product__price-row">
      <h4>Price: {{ product.price }} $</h4>
      <h4>Available in the stock: {{ product.rating.count }}</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from '@/store';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ShopItem',
  props: {
    product: Object as PropType<Product>,
  },
});
</script>
