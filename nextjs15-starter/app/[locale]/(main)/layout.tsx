import * as React from 'react';

import Header from '@/components/header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container">
      <Header />
      {children}
    </main>
  );
};

export default MainLayout;
