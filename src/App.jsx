import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
//import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import About from "./components/About";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
import UserContext from "./utils/useContext"
import { Provider } from "react-redux";
import store from "./utils/store";
import { BrowserRouter, Routes, Route } from 'react-router-dom';  

const Instamart = lazy(() => import("./components/Instamart"));

function App() {

  return (
    <>
      <Provider store={store}>
        <UserContext.Provider 
          value={{
          // user: user,
          // setUser: setUser
          }}>
          <BrowserRouter>
          <Header />
          <Routes>
            
            <Route path='/' element={<Body />} />
            <Route path='/about' element={<About />} />
            <Route path='/restaurant/:id' element={<RestaurantMenu />} />
            <Route path='/instamart' element=
              {
                <Suspense fallback={<div>Loading...</div>}>
                  <Instamart />
                </Suspense>
              }
            />
    
          </Routes>
          <Footer />
          </BrowserRouter>
        </UserContext.Provider>
      </Provider>
    </>
  )
}

export default App
