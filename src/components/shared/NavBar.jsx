import { Badge } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";
import { permissions } from "../../config/rbacConfig";
import { usePermission } from "../../hooks/usePermission";

function NavBar() {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);
  const { hasPermission } = usePermission(user?.roles);

  return (
    <div className="h-[70px] bg-custom-gradient text-white z-50 sticky top-0 flex items-center">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        <Link to={"/"} className="flex items-center text-2xl font-bold">
          <FaStore className="text-3xl mr-2" />
          <span className="font-[Poppins]">E-Shop</span>
        </Link>

        <ul
          className={`flex flex-col gap-4 absolute left-0 top-[70px] shadow-md transition-all duration-150 bg-custom-gradient text-white w-full px-4
                    sm:flex-row sm:items-center sm:gap-10 sm:static sm:shadow-none sm:h-[40px] sm:bg-none sm:w-fit sm:px-0 
                    ${
                      navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
                    }`}
        >
          <li className="font-[500] transition-all duration-200">
            <Link
              className={` ${
                path === "/" ? "text-white font-semibold" : "text-slate-400"
              }`}
              to={"/"}
            >
              Home
            </Link>
          </li>
          <li className="font-[500] transition-all duration-200">
            <Link
              className={` ${
                path === "/products"
                  ? "text-white font-semibold"
                  : "text-slate-400"
              }`}
              to={"/products"}
            >
              Products
            </Link>
          </li>
          <li className="font-[500] transition-all duration-200">
            <Link
              className={` ${
                path === "/about"
                  ? "text-white font-semibold"
                  : "text-slate-400"
              }`}
              to={"/about"}
            >
              About
            </Link>
          </li>
          <li className="font-[500] transition-all duration-200">
            <Link
              className={` ${
                path === "/contact"
                  ? "text-white font-semibold"
                  : "text-slate-400"
              }`}
              to={"/contact"}
            >
              Contact
            </Link>
          </li>
          {hasPermission(permissions.VIEW_DASHBOARD) && (
            <li className="font-[500] transition-all duration-200">
              <Link
                className={` ${
                  path === "/dashboard"
                    ? "text-white font-semibold"
                    : "text-slate-400"
                }`}
                to={"/dashboard"}
              >
                Dashboard
              </Link>
            </li>
          )}
          <li className="font-[500] transition-all duration-200">
            <Link
              className={` ${
                path === "/cart" ? "text-white font-semibold" : "text-slate-400"
              }`}
              to={"/cart"}
            >
              <Badge
                showZero
                badgeContent={cart.length}
                color="primary"
                overlap="circular"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <FaShoppingCart size={25} />
              </Badge>
            </Link>
          </li>
          {user && user.id ? (
            <li className="font-[500] transition-all duration-200">
              {/* usermenu */}
              <UserMenu />
            </li>
          ) : (
            <li className="font-[500] transition-all duration-200">
              <Link
                className={` 
                            flex items-center space-x-1 px-4
                            ${
                              path === "/login"
                                ? "text-white font-semibold"
                                : "text-slate-400"
                            }`}
                to={"/login"}
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>

        <button
          className="sm:hidden sm:mt-0 flex items-center mt-2"
          onClick={() => {
            setNavbarOpen(!navbarOpen);
          }}
        >
          {navbarOpen ? (
            <RxCross2 className="text-3xl text-white" />
          ) : (
            <IoIosMenu className="text-3xl text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
