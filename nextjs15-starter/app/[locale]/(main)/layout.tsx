import Header from '@/components/header';
import * as React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container">
      <Header />
      {children}
    </main>
  );
};

export default MainLayout;
