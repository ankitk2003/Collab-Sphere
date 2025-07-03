import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../store/atoms/loginState"; 

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useRecoilValue(authAtom); 

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
