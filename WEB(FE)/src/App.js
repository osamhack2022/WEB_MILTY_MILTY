import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Soldier from "./pages/Soldier";
import "./App.less";

const App = () => {
  const [user, setUser] = useState(null);

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
        <Route exact path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            user === null ? <Login /> : <Navigate to="/soldier" replace />
          }
        />
        <Route
          path="/admin/*"
          element={<Admin user={user} setUser={setUser} />}
        />
        <Route
          path="/soldier/*"
          element={<Soldier user={user} setUser={setUser} />}
        />
        <Route
          index
          element={
            user === null ? (
              <Navigate to="/login" />
            ) : (
              <Navigate to="/soldier" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
