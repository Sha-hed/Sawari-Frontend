import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getCurrentToken } from "../../redux/feature/auth/auth.slice";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(getCurrentToken);
  if (!token) {
    return <Navigate to={"/login"} replace></Navigate>;
  }
  return <div>{children}</div>
};

export default ProtectedRoutes;
