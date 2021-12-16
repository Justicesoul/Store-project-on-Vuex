import axios from 'axios';
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
};

export interface State {
  products: Product[],
  categories: string[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    products: [] as Product[],
    categories: [],
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setCategories(state, payload) {
      state.categories = payload
    },
  },
  actions: {
    async setProducts(state) {
      await axios.get('https://fakestoreapi.com/products')
        .then(({ data }) => {
          state.commit("setProducts", data);
        })
    },
    async setCategories(state) {
      await axios.get('https://fakestoreapi.com/products/categories')
        .then(({ data }) => {
          state.commit("setCategories", data);
        })
    }
  },
  modules: {},
  getters: {
    getProducts: state => state.products,
    getCategories: state => state.categories,
  }
});