import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
// import Registracija from "./pages/Registracija"

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"registracija"} element={<div>Welcome to register</div>} />
        {/* <Route path={"registracija"} element={<Registracija />} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
