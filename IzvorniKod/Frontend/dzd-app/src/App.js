import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import SharedLayout from './pages/SharedLayout';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SharedLayout></SharedLayout>}>
        <Route index={"/"} element={<Home></Home>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
