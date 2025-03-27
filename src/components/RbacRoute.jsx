import { Navigate, Outlet } from "react-router-dom";
import { usePermission } from "../hooks/usePermission";
import { roles } from "../config/rbacConfig";
import { useSelector } from "react-redux";

function RbacRoute({ requiredPermission, redirectTo = "/access-denied" }) {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const userRoles = user?.role || roles.USER;
  const { user } = useSelector((state) => state.auth);
  const userRoles = user?.roles || [ roles.USER ];

  const { hasPermission } = usePermission(userRoles);

  if (!hasPermission(requiredPermission)) {
    return <Navigate to={redirectTo} replace={true} />;
  }
  return <Outlet />;
}

export default RbacRoute;
