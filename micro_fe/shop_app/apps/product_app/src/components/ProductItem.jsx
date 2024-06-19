import React from 'react';

import { addToCart, removeFromCart } from 'shared_store/store';

const ProductItem = (props) => {
  const { id, inCart, title, description, amount, price, image } = props;

  return (
    <div className="flex gap-2 xs:flex-col md:flex-row">
      <div className="w-[200px] flex-none">
        <img
          className="w-full h-full block object-cover object-center"
          src={image}
          alt={`image-${title}`}
        />
      </div>
      <div className="flex flex-col">
        <div>
          <h1 className="font-bold text-xl">{title}</h1>
          <p className="text-slate-500 w-fit">{description}</p>
        </div>

        <div className="mt-auto">
          <p>{amount}</p>
          <p>{price}</p>
          <button
            disabled={amount == 0}
            className="bg-slate-300 btn px-2 py-1 mt-2 active:scale-90 disabled:pointer-events-none disabled:opacity-50"
            onClick={() =>
              addToCart({
                id,
                price,
                amount: 1,
              })
            }
          >
            Buy
          </button>
          <button
            onClick={() => removeFromCart(id)}
            className="bg-slate-300 px-2 py-1 mt-2 active:scale-90 disabled:pointer-events-none ml-4 disabled:opacity-50"
            disabled={!inCart}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
