import { createBrowserRouter } from 'react-router-dom';
import { Login } from './screens/Login';
import { CreateAccount } from './screens/CreateAccount';
import { Home } from './screens/Home';
import { Layout } from './components/Layout';
import { TicketDetails } from './components/TicketDetails';

export const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/create-account', element: <CreateAccount /> },
  {
    path: '/home',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'sweepstake/:id', element: <TicketDetails /> },
    ]
  },
]);
