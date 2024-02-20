import './style/globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
// import { App } from './App.tsx';
import { router } from './routes.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import { UserContextProvider } from './context/UserContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </UserContextProvider>
  </React.StrictMode>,
);
