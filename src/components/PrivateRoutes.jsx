import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { roles } from "../config/rbacConfig";

// Just validate user having authentication (not involving authorization)
const roleForDashBoard = [
  roles.SELLER,
  roles.ADMIN
]

const checkDashboardRedirection = (userRoles = [])=>{
  return userRoles.some(role => roleForDashBoard.includes(role));
}

function PrivateRoutes({ publicPage = false }) {
  const { user } = useSelector((state) => state.auth);
  console.log("PrivateRoutes: ",user)

  if (publicPage) {
    const userRoles = user?.roles;
    console.log("PrivateRoutes publicPage is TRUE: ", userRoles)
    if(userRoles){
      if(checkDashboardRedirection(userRoles)){
        return <Navigate to={"/dashboard"} replace={true}/>
      }
    }
    return user ? <Navigate to={"/"} replace={true}/> : <Outlet/>;
  }

  return user ? <Outlet/> : <Navigate to={"/login"}/>;
}

export default PrivateRoutes;
