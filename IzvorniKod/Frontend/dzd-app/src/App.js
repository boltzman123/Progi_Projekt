import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registracija from './pages/Registracija'
import Base from './pages/Base'
import ProtectedRoute from './components/Protected'
import Donation from './pages/Donation'

function App() {

  //da se localStorage brise svakih sat vremena
    useEffect(() => {
      var hours = 1;
      var now = new Date().getTime();
      var setupTime = localStorage.getItem('setupTime');
      if (setupTime == null) {
        localStorage.setItem('setupTime', now)
      } else {
        if(now-setupTime > hours*60*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
        }
      }
    }, [])
  
  return (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"login"} element={ <Login /> } />
            <Route path={"registracija"} element={<Registracija/> } />
            <Route path={"base"} element={<ProtectedRoute> <Base /> </ProtectedRoute>} />
            <Route path={"doniraj"} element={<ProtectedRoute> <Donation /> </ProtectedRoute>} />
            
        </Routes>
  </BrowserRouter>
  );
}

export default App;
