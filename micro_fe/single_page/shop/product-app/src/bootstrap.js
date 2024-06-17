import { createApp } from "vue";
import Product from "./product.vue";

const mount = (el) => {
  const app = createApp(Product);
  app.mount(el);
  return app;
};

export { mount };
