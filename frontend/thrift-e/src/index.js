import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import App from './App'
import Home from './routes/Home'  
import UserPage from './routes/UserPage'
import AllListingsPage from './routes/AllListingsPage'
import LandingPage from './routes/LandingPage'
import CreateListing from './routes/CreateListing'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LandingPage />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/user/:id',
        element: <UserPage />,
      },
      {
        path: '/listings',
        element: <AllListingsPage />
      },
      {
        path: '/create',
        element: <CreateListing />
      }
    ]
  },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)