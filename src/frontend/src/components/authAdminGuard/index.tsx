import useAuthStore from "@/stores/authStore";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

export const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin, logout, userData } = useContext(AuthContext);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const autoLogin = useAuthStore((state) => state.autoLogin);

  if (!isAuthenticated) {
    logout();
  } else if ((userData && !isAdmin) || autoLogin) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};
