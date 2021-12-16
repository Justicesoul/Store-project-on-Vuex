import { Store } from 'vuex'
import { Product } from './store/index.ts'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    products: Product[],
    console: number,
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}