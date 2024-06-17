import React, { Suspense } from "react";
const CheckoutAppReact = React.lazy(
  () => import("checkout_app_react/CheckoutApp"),
);
const ProductAppVue = React.lazy(() => import("./components/wapped-vue"));

import "./assets/style.css";

const App = () => {
  return (
    <div>
      <Suspense fallback="Loading checkout app react... ">
        <CheckoutAppReact />
      </Suspense>

      <Suspense fallback="Loading product app vue... ">
        <ProductAppVue />
      </Suspense>
    </div>
  );
};

export default App;
