import React, { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ classification, children }) => {
  const { user } = useAuth();
  console.log("api", user);
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  // 일단은 반환된 classification으로 값을 비교하지만 나중에는 /api/authtoken으로 토큰 검증후 페이지이동을 구현 시킬 예정.
  if (!user.token || user.classification !== classification) {
    return <Navigate to="/" />
  }
  return children;
};

export default ProtectedRoute;
