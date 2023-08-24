import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import App from './App'
import Home from './routes/Home'  
import UserPage from './routes/UserPage'
import UserItems from './routes/UsersItems'
import ItemsPage from './routes/ItemsPage'
import LandingPage from './routes/LandingPage'

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
        children: [
          {
            path: 'items',
            element: <ItemsPage />
          }
        ]
      },
      {
        path:'/items',
        element: <ItemsPage />
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