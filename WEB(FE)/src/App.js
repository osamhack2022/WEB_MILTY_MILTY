import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Soldier from "./pages/Soldier";
import Main from "./pages/Main";
import "./App.less";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (sessionStorage.getItem("user_id") !== null) {
      setUser({
        user_id: sessionStorage.getItem("user_id"),
        user_name: sessionStorage.getItem("user_name"),
        user_birthday: sessionStorage.getItem("user_birthday"),
        user_class: sessionStorage.getItem("user_class"),
        user_division: sessionStorage.getItem("user_division"),
        user_division_code: sessionStorage.getItem("user_division_code"),
      });
    }
  }, []);

  return (
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
};

export default App;
