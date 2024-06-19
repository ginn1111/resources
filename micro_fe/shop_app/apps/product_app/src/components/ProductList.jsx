import React, { useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { $store, initStore } from 'shared_store/store';
import ProductItem from './ProductItem';
import { useStore } from 'effector-react';

console.log('store', $store);

const PRODUCTS = Array(10)
  .fill(0)
  .map(() => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    amount: faker.number.int({ max: 10, min: 1 }),
    price: faker.commerce.price({ symbol: '$' }),
    image: faker.image.url(),
  }));

const ProductList = () => {
  const { productList, cart } = useStore($store);

  console.log(cart);

  useEffect(() => {
    initStore({
      productList: PRODUCTS,
      cart: [],
    });
  }, []);

  return (
    <section className="space-y-4 grid grid-cols-auto-fit gap-2 overflow-auto max-h-full">
      {productList.map((product) => (
        <ProductItem
          {...product}
          key={product.id}
          inCart={cart.some((i) => i.id === product.id)}
        />
      ))}
    </section>
  );
};

export default ProductList;
