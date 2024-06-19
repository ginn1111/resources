import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root-product-app'));

root.render(
  <div className="h-screen">
    <App />
  </div>
);
