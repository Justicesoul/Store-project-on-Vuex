<template>
  <button @click="clickHandler(category)" class="categories__button">
    {{ category }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    clickHandler: Function,
    category: String,
  },
});
</script>
