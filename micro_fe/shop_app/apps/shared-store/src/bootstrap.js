import { createApi } from 'effector';
import { createStore } from 'effector';

export const $store = createStore({
  productList: [],
  cart: [],
});

export const { initStore, addToCart, removeFromCart, update } = createApi(
  $store,
  {
    initStore: (_, store) => store,
    addToCart: ({ cart, productList }, item) => {
      console.log(productList, item);
      const product = productList.find((p) => p.id === item.id);

      const existItem = cart.find((c) => c.id === item.id);

      if (existItem) {
        existItem.amount++;
      } else {
        cart.push(item);
      }

      product.amount--;

      return {
        cart,
        productList,
      };
    },
    removeFromCart: ({ cart, productList }, itemId) => {
      const removeIdx = cart.findIndex((i) => i.id === itemId);
      const product = productList.find((p) => p.id === itemId);

      product.amount += cart[removeIdx].amount;

      cart.splice(removeIdx, 1);

      return { cart, productList };
    },
    update: ({ cart }, item) => {
      const _item = cart.find((i) => i.id === itemId);

      if (_item) {
        _item = {
          ...item,
        };
      }

      return [...cart];
    },
  }
);
