import './index.css'
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
import ListingPage from './routes/ListingPage'
import CheckoutPage from './routes/CheckoutPage'


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
        path: '',
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
      },
      {
        path: '/listing/:id',
        element: <ListingPage />,
        children: [
          {
            path: 'checkout',
            element: <CheckoutPage />
          }
        ]
      },
    ]
  },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)