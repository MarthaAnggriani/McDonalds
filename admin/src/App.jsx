import React from 'react'; // Mengimpor React dari 'react'
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/index';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}