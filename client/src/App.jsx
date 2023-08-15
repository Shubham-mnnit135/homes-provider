


import { Suspense, useEffect, useState } from "react";
import "./App.css";

import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import  { UserDetailContextProvider } from "./context/UserDetailContext";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";
import MyProperties from "./pages/My Properties/MyProperties";
import MyProperty from "./pages/My Property/MyProperty";
import MyBooking from "./pages/MyBooking/MyBooking";
function App() {
  const queryClient = new QueryClient();

  
  return (
    <UserDetailContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                {/* <Route path="/bookings" element={<Bookings/>} /> */}
                <Route path="/bookings">
                  <Route index element={<Bookings />} />
                  <Route path=":propertyId" element={<MyBooking />} />
                </Route>
                <Route path="/favourites" element={<Favourites/>} />
                <Route path="/myproperties" element={<MyProperties/>} />
                <Route path="/myproperties">
                  <Route index element={<MyProperties />} />
                  <Route path=":propertyId" element={<MyProperty />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContextProvider>
  );
}

export default App;
