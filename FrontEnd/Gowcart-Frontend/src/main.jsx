import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginForm from './Forms/loginForm.jsx'
import RegisterForm from './Forms/registerForm.jsx'
import ProtectedRoute from './Components/protectedRoute.jsx'
import SellPage from './Pages/Sell.jsx'
import CowFormPage from './Forms/cowForm.jsx'
import BuffaloFormPage from './Forms/buffForm.jsx'
import GoatFormPage from './Forms/goatForm.jsx'
import HorseFormPage from './Forms/horseForm.jsx'

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App /> {/* This is your layout with Header, Footer, and nested Outlet */}
      </ProtectedRoute>
    ),
    children: [
      {
        path: "sell",
        element: <SellPage/>
      },
      {
        path: "sell/cow",
        element: <CowFormPage/> // import this component
      },
      {
        path: "sell/buffalo",
        element: <BuffaloFormPage/> // import this component
      },
      {
        path: "sell/goat",
        element: <GoatFormPage/> // import this component
      },
      {
        path: "sell/goat",
        element: <GoatFormPage/> // import this component
      },
      {
        path: "sell/horse",
        element: <HorseFormPage/> // import this component
      },
    ]
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/register",
    element: <RegisterForm />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
