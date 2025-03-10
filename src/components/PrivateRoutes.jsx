import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes({ publicPage = false }) {
  const { user } = useSelector((state) => state.auth);
  console.log(user)
  if (publicPage) {
    return user ? <Navigate to={"/"} /> : <Outlet/>;
  }
  return user ? <Outlet/> : <Navigate to={"/login"}/>;
}

export default PrivateRoutes;
