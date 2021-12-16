<template>
  <div class="logo">
    <img class="logo__img" src="./assets/logo.png" alt="" />
    <h1 class="logo__text">ue shop</h1>
  </div>
  <div class="home">
    <div class="loading" v-if="products.length === 0">
      <img class="loading__image" src="./assets/loading.gif" />
    </div>
    <div class="shop" v-else>
      <div class="categories__buttons">
        <button @click="categoriesFilter('All')" class="categories__button">
          All
        </button>
        <div v-for="category in categories" :key="category">
          <Button :clickHandler="categoriesFilter" :category="category" />
        </div>
      </div>
      <input
        v-model="inputSearch"
        class="search"
        type="text"
        placeholder="Search by products..."
      />
      <div class="store">
        <div v-for="(product, index) in filteredList" :key="index">
          <ShopItem :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { Product } from './store';
import Button from '@/components/Button.vue';
import ShopItem from '@/components/ShopItem.vue';

export default defineComponent({
  name: 'App',
  components: {
    Button,
    ShopItem,
  },
  data: () => ({
    inputSearch: '',
    filtredShopItems: [] as Product[],
    initialState: true,
  }),
  methods: {
    ...mapActions({
      setProducts: 'setProducts',
      setCategories: 'setCategories',
    }),
    categoriesFilter(value: string) {
      if (value === 'All') {
        this.filtredShopItems = this.products;
      } else {
        this.filtredShopItems = this.products.filter(
          (item: { category: string }) => {
            return value === item.category;
          }
        );
      }
      this.initialState = false;
    },
  },
  computed: {
    ...mapGetters({ products: 'getProducts', categories: 'getCategories' }),
    filteredList() {
      if (this.initialState) {
        return this.products.filter((product: { title: string }) => {
          return product.title
            .toLowerCase()
            .includes(this.inputSearch.toLowerCase());
        });
      } else {
        return this.filtredShopItems.filter((product: { title: string }) => {
          return product.title
            .toLowerCase()
            .includes(this.inputSearch.toLowerCase());
        });
      }
    },
  },
  created() {
    this.setProducts();
    this.setCategories();
  },
});
</script>

<style lang="scss">
body {
  margin-top: 30px;
}

.home {
  position: relative;
  width: 100%;
  min-height: 100%;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.store {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 40px;
  justify-content: space-between;
  padding: 40px;
  align-items: stretch;
}

.product {
  height: 600px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgb(28, 121, 74, 0.8);
  border-radius: 8px;
  padding: 15px;
  box-shadow: rgba(28, 121, 74, 0.45) 0px 5px 15px;
  &:hover {
    box-shadow: rgba(247, 243, 34, 0.45) 0px 5px 15px;
    outline: rgba(247, 243, 34, 0.95) 1px solid;
    cursor: pointer;
  }
}

.logo__img {
  height: 100px;
  transition: height 2s;
  &:hover {
    height: 150px;
  }
  &:hover + .logo__text {
    text-decoration: underline;
  }
}

.product__image {
  height: 200px;
}

.logo__text {
  font-size: 40px;
  color: rgb(28, 121, 74, 0.8);
}

.product__price-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
}

.loading__image {
  width: 500px;
  height: 400px;
  object-fit: contain;
}

.search {
  display: block;
  margin: 40px auto 10px;
  width: 250px;
  padding: 10px 15px;
  border-radius: 4px;
  &:focus {
    outline: rgba(247, 243, 34, 0.95) 1px solid;
  }
}

.categories__buttons {
  display: flex;
  justify-content: space-around;
  margin: 30px;
}

.categories__button {
  padding: 10px 15px;
  background-color: rgb(28, 121, 74, 0.8);
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.4s;
  transition-delay: 0.1s;
  &:hover {
    background-color: rgba(247, 243, 34, 0.95);
    color: rgb(1, 1, 92);
  }
}
</style>
