import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BackDrop from "./BackDrop";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../store/actions";
import toast from "react-hot-toast";

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    // get div tag when i click ti show menu
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = ()=>{
    dispatch(logOutUser(navigate,toast))
  }

  return (
    <div className="relative z-40">
      <div
        className=" sm:text-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md text-slate-700"
        onClick={handleClick}
      >
        <Avatar alt="Menu" src="" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { width: 160 },
        }}
      >
        <Link to={"/profile"}>
          <MenuItem onClick={handleClose} className="flex gap-2">
            <BiUser className="text-xl" />
            <span className="font-bold text-[16px] mt-1">{user?.username}</span>
          </MenuItem>
        </Link>
        <Link to={"/profile/orders"}>
          <MenuItem onClick={handleClose} className="flex gap-2">
            <FaShoppingCart className="text-xl" />
            <span className="font-bold text-[16px] mt-1">Orders</span>
          </MenuItem>
        </Link>
        <MenuItem onClick={logOutHandler} className="flex gap-2">
          <div className="font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1 text-white  rounded-sm">
            <IoExitOutline className="text-xl" />
            <span className="font-bold text-[16px] mt-1">LogOut</span>
          </div>
        </MenuItem>
      </Menu>

      {open && <BackDrop/>}
    </div>
  );
}

export default UserMenu;
