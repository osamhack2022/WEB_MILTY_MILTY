import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Soldier from "./pages/Soldier";
import "./App.less";

const ADMIN = 0;
const USER = 1;

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
          <ProtectedRoute classification={ADMIN}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/soldier/*"
        element={
          <ProtectedRoute classification={USER}>
            <Soldier />
          </ProtectedRoute>
        }
      />
      <Route
        index
        element={ // index에서 user 비교 후 해당된 경로로 이동. !! eslint 문법 어긋난 수정이 필요한 코드
          // eslint-disable-next-line no-nested-ternary
          user === null ? <Navigate to="/login" /> :
            user.classification === ADMIN
              ? <Navigate to="/admin" replace /> : <Navigate to="/soldier" replace />
        }
      />
    </Routes>
  );
};

export default App;
