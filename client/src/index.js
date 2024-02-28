import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from './Login-Booking-Edit/compo/RegisterPage.js';
import Profile from './Login-Booking-Edit/compo/Profile.js'; 
import NavigateBar from './Login-Booking-Edit/compo/Navbar.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
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
