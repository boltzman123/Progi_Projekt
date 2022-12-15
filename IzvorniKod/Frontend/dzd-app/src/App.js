import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Registracija from './pages/Registracija'
import Base from './pages/Base'
import ProtectedRoute from './components/Protected'
import LoggedIn from './components/LoggedIn'
import Donation from './pages/Donation'
import CanDonateRoute from './components/canDonate'
import User from './pages/User'
import Djeca from './pages/Djeca'
import UsersOverview from './pages/usersOverview'



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
            <Route path={"login"} element={ <LoggedIn> <Login /> </LoggedIn> } />
            <Route path={"registracija"} element={<LoggedIn> <Registracija/> </LoggedIn> } />
            <Route path={"base"} element={<ProtectedRoute> <Base /> </ProtectedRoute>} />
            <Route path={"doniraj"} element={<CanDonateRoute> <Donation /> </CanDonateRoute>} />
            <Route path={"user"} element={<ProtectedRoute> <User /> </ProtectedRoute>} />
            <Route path={"pregledKorisnika"} element={<ProtectedRoute> <UsersOverview /> </ProtectedRoute>} />
            <Route path={"djeca"} element={<ProtectedRoute> <Djeca /> </ProtectedRoute>} />
            <Route path={"*"} element={<div> Dobrodosli na Easter egg stranicu</div>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
