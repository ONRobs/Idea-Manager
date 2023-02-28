import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./styles.css"; 

import Index from "./views/index";
import Rate from './views/rate';
import Table from './views/table';
import Test from './views/test'
import ErrorPage from "./views/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "rate/",
    element: <Rate />,
    errorElement: <ErrorPage />,
  },
  {
    path: "table/",
    element: <Table />,
    errorElement: <ErrorPage />,
  },
  {
    path: "test/",
    element: <Test />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

