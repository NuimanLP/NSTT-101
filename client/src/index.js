import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NavigateBar from './compo/Navbar';
import Tourid from './Detail/Tourid';
import Interface from './Payment/interface.jsx'
import Transaction from './Payment/transaction.jsx'
import PaidPayment from './Payment/paidPayment.jsx';
import Booking from './Payment/booking.jsx';
import LoginForm from './Login-Booking-Edit/component/LoginForm';
import RegisterPage from './Login-Booking-Edit/component/RegisterPage';
import Profile from './Login-Booking-Edit/component/Profile';

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
    path: "/payment/:id",
    element: <Interface/>
  },
  {
    path: "/transaction/:id",
    element: <Transaction/>
  },
  {
    path: "/paidPayment/:id",
    element: <PaidPayment/>
  },
  {
    path: "/booking/:id",
    element:<Booking/>
  }

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
