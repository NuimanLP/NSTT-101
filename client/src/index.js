import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from './compo/RegisterPage';
import Profile from './compo/Profile'; 
import NavigateBar from './compo/Navbar';
import LoginForm from './compo/LoginForm';
import Tourid from './Detail/Tourid';
import Interface from './Payment/interface.jsx'
import Transaction from './Payment/transaction.jsx'
import PaidPayment from './Payment/paidPayment.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <LoginForm/>
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path : "/profile",
    element: <Profile/>,
  },
  {
    path : "/test",
    element: <NavigateBar/>,
  },
  {
    path: "/tour/:id",
    element: <Tourid/>
  },
  {
    path: "/payment/",
    element: <Interface/>
  },
  {
    path: "/transaction",
    element: <Transaction/>
  },
  {
    path: "/paidPayment",
    element: <PaidPayment/>
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
