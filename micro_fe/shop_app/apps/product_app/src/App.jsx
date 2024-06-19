import '@repo/configs/tailwind.global.css';
import '../public/assets/style.css';

import React from 'react';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <main className="container max-h-full overflow-y-auto overflow-x-hidden py-2 px-4 border-2 border-[#58c4dc]">
      <ProductList />
    </main>
  );
};

export default App;
