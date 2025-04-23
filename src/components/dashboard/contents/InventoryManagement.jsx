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

function InventoryManagement() {
  const [products, setProducts] = useState([
    {
      id: 1,
      productName: "Smart Watch",
      description:
        "Smart Watch, Liquid Retina XDR display, and 22-hour battery life.",
      price: 1200,
      discount: 10,
      quantity: 15,
      image: "localhost:3000/abd",
    },
    {
      id: 2,
      productName: "Wireless Earbuds",
      description: "Noise cancelling earbuds with 24-hour battery life.",
      price: 199,
      discount: 5,
      quantity: 42,
      image: "localhost:3000/xyz",
    },
    {
      id: 3,
      productName: "Laptop Pro",
      description: "16-inch display, 32GB RAM, 1TB storage.",
      price: 2499,
      discount: 0,
      quantity: 8,
      image: "localhost:3000/laptop",
    },
  ]);
  // const [roleDBs, setRoleDBs] = useState([]);
  const [addProductModal, setAddProductModal] = useState(false);
  // const [selectedUser, setSelectdUser] = useState(null);

  // Slice users for pagination
  // const paginatedUsers = users.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       // setUsers(fakeUsers);
  //       const { data } = await api.get("/users");
  //       console.log(data);
  //       setUsers(data)
  //     } catch (error) {
  //       console.log("Failed to fecth users: ", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  // useEffect(() => {
  //   const fetchRoles = async () => {
  //     try {
  //       const { data } = await api.get("/users/roles");
  //       console.log(data);
  //       setRoleDBs(data)
  //     } catch (error) {
  //       console.log("Failed to fecth roles: ", error);
  //     }
  //   };
  //   fetchRoles();
  // }, []);

  // const handleAddUser = () => {
  //   setSelectdUser(null);
  //   setAddUserModal(true);
  // };

  // Calculate discounted price
  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
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
              placeholder="Search Products"
            />
            <FiSearch className="absolute left-3 text-slate-800 size={30}" />
          </div>
          <FormControl className="w-[120px]">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              className="h-[42px] ml-2"
              labelId="category-select-label"
              id="category-select"
              value={"All"}
              label={"Roles"}
              onChange={() => {}}
            >
              <MenuItem value={"All"}>All</MenuItem>
              {/* {roleDBs.map((role) => (
                <MenuItem key={role.roleId} value={role.roleName}>
                  {role.roleName}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
        </div>
        <Button
          className="min-w-[200px] w-[200px]"
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={() => {
            // handleAddUser();
          }}
        >
          <span>Add Product</span>
        </Button>

        <GeneralModal open={addProductModal} setOpen={setAddProductModal}>
          {/* <AddUserForm
            user={selectedUser}
            roleDBs={roleDBs.map((role) => ({
              label: role.roleName,
              value: role.roleName === roles.SELLER ? 'seller' 
                    : role.roleName === roles.USER ? 'user' : null
            }))}
            setOpenUserModal={setAddUserModal}
            setUsers={setUsers}
          /> */}
        </GeneralModal>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="img"
                      src="/api/placeholder/40/40"
                      alt={product.productName}
                      sx={{ width: 40, height: 40, borderRadius: "50%", mr: 2 }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      {product.productName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      $
                      {getDiscountedPrice(
                        product.price,
                        product.discount
                      ).toFixed(2)}
                    </Typography>
                    {product.discount > 0 && (
                      <Typography
                        variant="caption"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  {product.discount > 0 ? (
                    <Chip
                      label={`${product.discount}%`}
                      size="small"
                      color="success"
                    />
                  ) : (
                    <Chip label="None" size="small" variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{product.quantity}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    // onClick={() => handleEdit(product.id)}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    // onClick={() => handleDelete(product.id)}
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

export default InventoryManagement;
