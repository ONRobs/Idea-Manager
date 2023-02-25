import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./styles.css"; 

import Index from "./routes/index";
import Rate from './routes/rate';
import Table from './routes/table';
import Test from './routes/test'
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "rate/",
    element: <Rate />,
  },
  {
    path: "table/",
    element: <Table />,
  },
  {
    path: "test/",
    element: <Test />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
