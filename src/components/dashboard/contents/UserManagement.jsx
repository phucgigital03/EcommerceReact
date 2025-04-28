import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { roles } from "../../../config/rbacConfig";
import api from "../../../api/api";
import GeneralModal from "../../shared/GeneralModal";
import AddUserForm from "./forms/AddUserForm";

const fakeRoles = [
  {
    roleId: 1,
    roleName: "ROLE_USER",
  },
  {
    roleId: 2,
    roleName: "ROLE_SELLER",
  },
];

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [roleDBs, setRoleDBs] = useState([]);
  const [addUserModal, setAddUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [selectedUser, setSelectdUser] = useState(null);

  // Slice users for pagination
  // const paginatedUsers = users.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // setUsers(fakeUsers);
        const { data } = await api.get("/users");
        console.log(data);
        setUsers(data)
      } catch (error) {
        console.log("Failed to fecth users: ", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data } = await api.get("/users/roles");
        console.log(data);
        setRoleDBs(data)
      } catch (error) {
        console.log("Failed to fecth roles: ", error);
      }
    };
    fetchRoles();
  }, []);

  const handleAddUser = () => {
    setSelectdUser(null);
    setAddUserModal(true);
  };

  const handleEdit = (userId)=>{
    const chosenUser = users.find(
      (user) => user.id == userId
    );
    if (chosenUser) {
      setSelectdUser(chosenUser);
      setAddUserModal(true);
    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      {/* Search and Add User Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <div className="wrap-search-role flex items-center">
          {/* Search Bar */}
          <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
            <input
              value={""}
              onChange={(e) => {
                // setSearchTerm(e.target.value);
              }}
              className="border border-gray-400 text-slate-600 rounded-md py-2 pl-10 pr-6 w-full focus:outline focus:ring-2"
              type="text"
              placeholder="Search Users"
            />
            <FiSearch className="absolute left-3 text-slate-800 size={30}" />
          </div>
          <FormControl className="w-[120px]">
            <InputLabel id="category-select-label">Roles</InputLabel>
            <Select
              className="h-[42px] ml-2"
              labelId="category-select-label"
              id="category-select"
              value={"All"}
              label={"Roles"}
              onChange={() => {}}
            >
              <MenuItem value={"All"}>All</MenuItem>
              {roleDBs.map((role) => (
                <MenuItem key={role.roleId} value={role.roleName}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button
          className="min-w-[200px] w-[200px]"
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={() => {
            handleAddUser();
          }}
        >
          <span>Add User</span>
        </Button>

        <GeneralModal open={addUserModal} setOpen={setAddUserModal}>
          <AddUserForm
            user={selectedUser}
            roleDBs={roleDBs.map((role) => ({
              label: role.roleName,
              value: role.roleName === roles.SELLER ? 'seller' 
                    : role.roleName === roles.USER ? 'user' : null
            }))}
            setOpenUserModal={setAddUserModal}
            setUsers={setUsers}
          />
        </GeneralModal>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.roles.map((role) => (
                    <Chip
                      key={role.roleId}
                      label={role.roleName}
                      size="small"
                      color={
                        role.roleName === roles.SELLER ? "primary" : "default"
                      }
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleEdit(user?.id);
                    }}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    // onClick={() => handleDeleteUser(user.id)}
                  >
                    <FaTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserManagement;
