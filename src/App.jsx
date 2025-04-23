// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Products from "./components/products/Products";
import Home from "./components/homes/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/shared/NavBar";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import LogIn from "./components/auth/LogIn";
import PrivateRoutes from "./components/PrivateRoutes";
import Register from "./components/auth/Register";
import Checkout from "./components/checkouts/checkout";
import PaymentConfirmStripe from "./components/checkouts/PaymentConfirmStripe";
import CheckVNPayStatus from "./components/checkouts/CheckVNPayStatus";
import NotFound from "./components/NotFound";
import AccessDenied from "./components/AccessDenied";
import DashboardManage from "./components/dashboard/DashboardManage";
import Support from "./components/dashboard/Support";
import RbacRoute from "./components/RbacRoute";
import { permissions } from "./config/rbacConfig";
import { RiDashboardLine, RiUserLine, RiTruckLine } from "react-icons/ri";
import { BiDollar, BiStore } from "react-icons/bi";
import { MdInventory, MdPointOfSale } from "react-icons/md";
import UserManagement from "./components/dashboard/contents/UserManagement";
import OrderManagement from "./components/dashboard/contents/OrderManagement";
import AddressManagement from "./components/dashboard/contents/AddressManagement";
import CategoryManagement from "./components/dashboard/contents/CategoryManagement";
import InventoryManagement from "./components/dashboard/contents/InventoryManagement";
import Profile from "./components/profile/Profile";
import OAuth2RedirectHandler from "./components/auth/OAuth2RedirectHandler";

// /dashboard
// /dashboard/usermanagement
// /dashboard/ordermanagement
// /dashboard/categorymanagement
// /dashboard/addressmanagement
// /dashboard/inventorymanagement

export const sidebarItems = [
  {
    text: "Dashboard",
    icon: <RiDashboardLine />,
    link: "/dashboard",
    component: <DashboardManage />,
    permission: permissions.VIEW_ADMIN_TOOLS,
    content: <div>Some charts</div>,
  },
  {
    text: "User Management",
    icon: <RiUserLine />,
    link: "/dashboard/usermanagement",
    component: <DashboardManage />,
    permission: permissions.VIEW_USER,
    content: <UserManagement />,
  },
  {
    text: "Order Management",
    icon: <BiStore />,
    link: "/dashboard/ordermanagement",
    component: <DashboardManage />,
    permission: permissions.VIEW_ORDER,
    content: <OrderManagement />,
  },
  {
    text: "Category Management",
    icon: <BiDollar />,
    link: "/dashboard/categorymanagement",
    component: <DashboardManage />,
    permission: permissions.VIEW_CATEGORY,
    content: <CategoryManagement />,
  },
  {
    text: "Address Management",
    icon: <RiTruckLine />,
    link: "/dashboard/addressmanagement",
    component: <DashboardManage />,
    permission: permissions.VIEW_ADDRESS,
    content: <AddressManagement />,
  },
  {
    text: "Inventory Management",
    icon: <MdInventory />,
    link: "/dashboard/inventorymanagement",
    component: <DashboardManage />,
    permission: permissions.VIEW_INVENTORY,
    content: <InventoryManagement />,
  },
  {
    text: "Support",
    icon: <MdPointOfSale />,
    link: "/dashboard/support",
    component: <Support />,
    permission: permissions.VIEW_SUPPORT,
  },
];

function App() {
  // const { user } = useSelector((state) => state.auth);
  // console.log("PrivateRoutes: ",user)

  return (
    <>
      <Router>
        <NavBar />

        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

          {/* Public Route have condition: if user have authentication,
            then redirect Home('/'). Otherwise,redirect (/login or /register) */}
          <Route element={<PrivateRoutes publicPage />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Private Route just authenticate */}
          <Route element={<PrivateRoutes />}>

            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirm" element={<PaymentConfirmStripe />} />
            <Route
              path="/order/:orderId/status"
              element={<CheckVNPayStatus />}
            />

            {/* Private Route have authenticate and authorizate */}
            <Route
              element={
                <RbacRoute requiredPermission={permissions.VIEW_DASHBOARD} />
              }
            >
              {sidebarItems.map((sidebar) => {
                return (
                  <Route
                    key={sidebar.text}
                    path={sidebar.link}
                    element={sidebar.component}
                  />
                );
              })}
            </Route>

            <Route
              element={
                <RbacRoute requiredPermission={permissions.VIEW_SUPPORT} />
              }
            >
              <Route path="/support" element={<Support />} />
            </Route>

          </Route>

          {/* other routers */}
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <Toaster position="top-center" />
    </>
  );
}

export default App;
