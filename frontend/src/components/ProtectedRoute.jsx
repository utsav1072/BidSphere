import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const authTokens = useSelector((state) => state.auth.authTokens);
  const location = useLocation();

  return authTokens ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;
