import { useRef, useEffect } from 'react';
import VueApp from 'checkout_app/App';

const WrappedVue = () => {
  const ref = useRef(null);

  useEffect(() => {
    VueApp.mount(ref.current);
  }, []);

  return <div className="h-full" ref={ref} />;
};

export default WrappedVue;
