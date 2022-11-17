import './App.css'
import { BrowserRouter, Routes, Route, useState } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registracija from './pages/Registracija'
import Base from './pages/Base'
import ProtectedRoute from './components/Protected'

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"registracija"} element={<Registracija/>} />
        <Route path={"base"} element={<ProtectedRoute> <Base /> </ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
