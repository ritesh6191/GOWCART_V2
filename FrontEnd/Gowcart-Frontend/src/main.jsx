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
import UserProfile from './Pages/userProfile.jsx'
import BuyPage from './Pages/Buy.jsx'
import { Navigate } from "react-router-dom";
import AnimalDetail from './Pages/AnimalDetails.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cowPage from './Pages/cowPage.jsx'



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
        index: true,
        element: <Navigate to="/buy" replace />
      },
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
        path: "sell/horse",
        element: <HorseFormPage/> // import this component
      },
      {
        path: "/profile",
        element: <UserProfile/> // import this component
      },
      {
        path:"/buy",
        element:<BuyPage/>
      },
      {
        path:"/buy/cow",
        element:<cowPage/>
      },
      {
        path:"/animal/:type/:id",
        element:<AnimalDetail/>
      }
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
