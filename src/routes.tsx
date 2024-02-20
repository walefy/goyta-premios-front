import { createBrowserRouter } from 'react-router-dom';
import { Login } from './screens/Login';
import { CreateAccount } from './screens/CreateAccount';
import { Home } from './screens/Home';

export const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/create-account', element: <CreateAccount /> },
  { path: '/home', element: <Home /> },
]);
