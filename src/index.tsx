import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import SingleJoke from './pages/SingleJoke';
import Login from './pages/Login';

export const useCheckAuthorization = (condition: boolean) => {
  const [isConditionTrue, setIsConditionTrue] = useState(false);
  useEffect(() => {
    if (condition) {
      setIsConditionTrue(true);
    };
  }, [condition]);

  return isConditionTrue;
};

const router = createBrowserRouter([
  {
    path: "all-jokes",
    element: <Home />,
  },
  {
    path:"joke/:jokeId",
    element: <SingleJoke />
  },
  {
    path:"joke/create",
    element: <SingleJoke />
  },
  {
    path: "/",
    element: <Login />
  }


]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
