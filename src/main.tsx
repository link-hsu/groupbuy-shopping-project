import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from '@/Home';
import { loader as authenticationLoader } from '@/authentication';
import { action  as sendOrderAction } from './checkout';
import '@/index.css';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '@/state/api';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { CheckoutForm } from './checkout';

// export const store = configureStore({
//   reducer: { [api.reducerPath]: api.reducer },
//   middleware: (getDefault) => getDefault().concat(api.middleware),
// });
// setupListeners(store.dispatch);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'auth',
        loader: authenticationLoader,
      },
    ],
  },
  {
    path: '/checkout',
    element: <CheckoutForm />,
    action: sendOrderAction,
  }
], {basename: "/groupbuy-shopping-project/"});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApiProvider api={api}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ApiProvider>,
);
