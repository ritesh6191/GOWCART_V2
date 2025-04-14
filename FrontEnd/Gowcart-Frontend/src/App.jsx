import { useState } from 'react'
import Header from './Components/header'
import Footer from './Components/footer'
import LoginForm from './Forms/loginForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';




function App() {

  return (
    <>
   <Header/>
   <ToastContainer position="top-center" autoClose={2000} />
   <main className="min-h-screen px-4 pb-28">
      <Outlet/>
   </main>
   <Footer/>
    </>
  )
}

export default App
