import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../redux/feature/auth/auth.slice";
import { useAppSelector } from "../../redux/hooks";
import { TUser } from "../../pages/Dashboard/User/user.types";


const ProtectedFace2 = () => {

  const user: TUser | null = useAppSelector(getCurrentUser);

  if (user?.role === "admin") {
    return <Navigate to={"/dashboard"}></Navigate>;
  }
  return <Navigate to={"/userDashboard"}></Navigate>;
};

export default ProtectedFace2;
