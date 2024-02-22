import { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export function Layout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="flex flex-col gap-y-5 pt-5 pb-14 lg:pb-0 lg:pt-0 w-screen h-screen">
      {windowWidth >= 768 && <Header />}
      <Outlet />
      {windowWidth < 768 && <Footer />}
    </main>
  );
}
