import React, { useEffect, useRef } from "react";

import { mount } from "product_app_vue/ProductApp";

const WrappedVue = () => {
  const ref = useRef();

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};

export default WrappedVue;
