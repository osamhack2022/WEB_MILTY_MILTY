import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Soldier from "./pages/Soldier";
import Main from "./pages/Main";
import "./App.less";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/main" element={<Main />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/soldier/*" element={<Soldier />} />
    </Routes>
  </BrowserRouter>
);

export default App;
