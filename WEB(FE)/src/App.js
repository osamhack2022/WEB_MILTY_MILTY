import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Soldier from "./pages/Soldier";
import "./App.less";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route exact path="/register" element={<Register />} />
      <Route
        path="/login"
        element={user === null ? <Login /> : <Navigate to="/" replace />}
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/soldier/*"
        element={
          <ProtectedRoute>
            <Soldier />
          </ProtectedRoute>
        }
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
  );
};

export default App;
