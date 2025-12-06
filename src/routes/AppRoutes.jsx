import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import DashboardHome from '../pages/DashboardHome'
import Settings from '../pages/Settings'
import VendorList from '../pages/vendors/VendorList'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import UserList from '../pages/users/UserList'
import Logout from "../pages/Logout";
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword"
const routes = [
  {
    path: '/',
    element: (
      <PrivateRoute role="admin" >
        <DashboardLayout />
      </PrivateRoute>),
    children: [
      { index: true, element: <DashboardHome />, meta: { label: 'Dashboard' } },
      {
        path: 'vendor',
        element: <VendorList />,
        meta: { label: 'Images' },
      },
      {
        path: 'user',
        element: <UserList />,
        meta: { label: 'Videos' },
      },

      { path: 'settings', element: <Settings />, meta: { label: 'Profile' } },
      { path: 'logout', element: <Logout />, meta: { label: 'Logout' } },

    ],
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
    { path: "/forgot-password",
       element: <ForgotPassword /> 
  },
  {
 path:"/reset-password/:token",
 element:<ResetPassword />
  } 

]

const router = createBrowserRouter(routes)

// navItems: simplified structure for sidebar consumption
export const navItems = routes[0].children
  .filter(r => r.path)
  .map(r => ({ path: r.path, meta: r.meta || {}, children: (r.children || []).map(c => ({ path: c.path, index: !!c.index, meta: c.meta || {} })) }))

export default router
