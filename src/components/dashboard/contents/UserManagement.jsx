import { useState } from "react";
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
  TablePagination,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

// Sample user data
const initialUsers = [
  {
    id: 1,
    email: "john.doe@example.com",
    username: "johndoe",
    roles: ["Admin", "Editor"],
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    username: "janesmith",
    roles: ["Viewer"],
  },
  {
    id: 3,
    email: "mike.johnson@example.com",
    username: "mikejohnson",
    roles: ["Editor"],
  },
];

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice users for pagination
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      {/* Search and Add User Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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
        <Button
          className="min-w-[200px] w-[200px]"
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={() => {
            // setCurrentUser({ email: '', username: '', roles: [] });
            // setOpenAddModal(true);
          }}
        >
          <span>Add User</span>
        </Button>
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
            {paginatedUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.roles.map((role) => (
                    <Chip
                      key={role}
                      label={role}
                      size="small"
                      color={
                        role === "Admin"
                          ? "error"
                          : role === "Editor"
                          ? "primary"
                          : "default"
                      }
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      // setCurrentUser(user);
                      // setOpenEditModal(true);
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

export default UserManagement;
