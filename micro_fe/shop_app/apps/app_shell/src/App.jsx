import '../public/assets/style.css';
import '@repo/configs/tailwind.global.css';

import React, { Suspense } from 'react';
import WrappedVue from './components/WrappedVue';
const ProductApp = React.lazy(() => import('product_app/App'));

const App = () => {
  return (
    <main className="container px-4 py-2 h-screen grid gap-2 md:grid-cols-[2fr_1fr] xs:grid-cols-1">
      <div className="relative h-full overflow-hidden">
        <p className="absolute left-0 bg-[#58c4dc] text-white px-2 py-1">
          React
        </p>

        <Suspense fallback="Loading product app ...">
          <ProductApp />
        </Suspense>
      </div>
      <div className="border-2 border-[#42b983] relative">
        <p className="absolute bg-[#42b983] left-0 px-2 py-1 text-white">Vue</p>
        <WrappedVue />
      </div>
    </main>
  );
};

export default App;
