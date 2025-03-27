import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  // Typography,
  Paper,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Checkbox,
  Button,
  // IconButton,
  // TextField,
  // MenuItem,
  // Select,
  // Switch,
  // Chip,
  // Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  // Divider,
  // Drawer,
  // AppBar,
  // Toolbar,
  // Menu,
  // Pagination,
} from "@mui/material";

// Import icons from react-icons
import {
  // FiPlus,
  // FiTrash2,
  // FiEdit,
  // FiChevronDown,
  // FiChevronLeft,
  // FiSearch,
  FiLogOut,
} from "react-icons/fi";

// import { CgProfile } from "react-icons/cg";
import { usePermission } from "../../hooks/usePermission";
import { useSelector } from "react-redux";
import { permissions } from "../../config/rbacConfig";
import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "../../App";

// const productData = [
//   {
//     id: 1,
//     name: "Coffee Maker",
//     price: "4122 Tk",
//     status: true,
//     image: "/api/placeholder/60/60",
//     permissions: ["Pending"],
//   },
//   {
//     id: 2,
//     name: "Apple MacBook Air retina 8 gb",
//     price: "93122 Tk",
//     status: false,
//     image: "/api/placeholder/60/60",
//     permissions: ["Active", "Inactive"],
//   },
//   {
//     id: 3,
//     name: "Hamilton Cooker",
//     price: "12558 Tk",
//     status: true,
//     image: "/api/placeholder/60/60",
//     permissions: ["Create", "Read", "Edit", "Delete"],
//   },
//   {
//     id: 4,
//     name: "Apple Pro display XDR",
//     price: "184622 Tk",
//     status: true,
//     image: "/api/placeholder/60/60",
//     permissions: ["Create", "Delete"],
//   },
// ];

// const getChipColor = (permission) => {
//   switch (permission) {
//     case "Create":
//       return "info";
//     case "Read":
//       return "primary";
//     case "Edit":
//       return "secondary";
//     case "Delete":
//       return "error";
//     case "Active":
//       return "success";
//     case "Inactive":
//       return "default";
//     case "Pending":
//       return "warning";
//     default:
//       return "default";
//   }
// };

export default function DashboardManage() {
  // const [selectedProducts, setSelectedProducts] = useState([]);
  // const [entriesPerPage, setEntriesPerPage] = useState(10);
  // const [page, setPage] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const { hasPermission } = usePermission(user?.roles);
  const [tabIndex, setTabIndex] = useState(sidebarItems[0].text);
  const location = useLocation();

  console.log("Dashboard Management: ", user);
  console.log("Dashboard Management: ",hasPermission(permissions.VIEW_ADMIN_TOOLS));

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = productData.map((n) => n.id);
  //     setSelectedProducts(newSelected);
  //     return;
  //   }
  //   setSelectedProducts([]);
  // };

  // const handleClick = (id) => {
  //   const selectedIndex = selectedProducts.indexOf(id);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selectedProducts, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selectedProducts.slice(1));
  //   } else if (selectedIndex === selectedProducts.length - 1) {
  //     newSelected = newSelected.concat(selectedProducts.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selectedProducts.slice(0, selectedIndex),
  //       selectedProducts.slice(selectedIndex + 1),
  //     );
  //   }

  //   setSelectedProducts(newSelected);
  // };

  // const isSelected = (id) => selectedProducts.indexOf(id) !== -1;

  useEffect(() => {
    console.log("check Dashboard ", location.pathname);
    const currPathname = location.pathname;
    const selectedItem = sidebarItems.find(
      (item) => item.link === currPathname
    );
    setTabIndex(selectedItem?.text);
  }, []);

  useEffect(() => {
    if (location.pathname) {
      const currPathname = location.pathname;
      const selectedItem = sidebarItems.find(
        (item) => item.link === currPathname
      );
      setTabIndex(selectedItem?.text);
    }
  }, [location.pathname]);


  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#1976d2",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="100vw"
        disableGutters // This removes the default padding
        sx={{
          width: "100%",
          px: 0, // Explicitly set horizontal padding to 0 (redundant with disableGutters but added for clarity)
        }}
      >
        <Paper sx={{ display: "flex", overflow: "hidden", height: "100%" }}>
          {/* Sidebar */}
          <Box
            sx={{ width: 260, bgcolor: "#f5f5f5", p: 2, position: "relative" }}
          >
            <List>
              {sidebarItems.map((item) => (
                <React.Fragment key={item.text}>
                  <ListItem
                    component={Link}
                    to={item.link}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 1,
                      mb: 0.5,
                      bgcolor:
                        item.text === tabIndex
                          ? "rgba(25, 118, 210, 0.08)"
                          : "transparent",
                      "&:hover": { bgcolor: "rgba(25, 118, 210, 0.12)" },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ position: "absolute", bottom: "80px", left: "40px" }}>
              <Button
                startIcon={<FiLogOut />}
                variant="outlined"
                color="error"
                fullWidth
                sx={{ justifyContent: "flex-start", pl: 2 }}
              >
                Logout
              </Button>
            </Box>
          </Box>

          {/* Main Content */}
          <div className="dashboard p-[20px] w-[100%]">
            {/* <h2 className="font-semibold text-2xl text-blue-500">
              Welcome to dashboard
            </h2> */}
            <Box>
              <Container>
                {sidebarItems.map((item) => {
                  return (
                    tabIndex === item.text &&
                    (hasPermission(item.permission) ? (
                      <div key={item.text}>
                        {item.content}
                      </div>
                    ) : (
                      <p key={item.text} className="text-red-500">Access-Denied: Content just only for admin...</p>
                    ))
                  );
                })}
              </Container>
            </Box>
          </div>
        </Paper>
      </Container>
    </Box>
  );
}

{
  /* <Box sx={{ flexGrow: 1, p: 3 }}>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mb: 2,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <FiChevronLeft style={{ marginRight: "8px" }} />
      <Typography variant="h6">Product List</Typography>
    </Box>
  </Box>

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mb: 2,
    }}
  >
    <Box>
      <Button
        variant="outlined"
        startIcon={<FiPlus />}
        color="success"
        sx={{ mr: 1 }}
      >
        ADD
      </Button>
      <Button
        variant="outlined"
        startIcon={<FiTrash2 />}
        color="error"
        sx={{ mr: 1 }}
      >
        DELETE
      </Button>
      <Button variant="outlined" endIcon={<FiChevronDown />} sx={{ mr: 1 }}>
        ACTION
      </Button>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Select
        value={entriesPerPage}
        onChange={(e) => setEntriesPerPage(e.target.value)}
        size="small"
        sx={{ mr: 2, minWidth: 80 }}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
      <TextField
        placeholder="Search"
        size="small"
        InputProps={{
          endAdornment: <FiSearch />,
        }}
      />
    </Box>
  </Box>

  <TableContainer component={Paper} sx={{ mb: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={
                selectedProducts.length > 0 &&
                selectedProducts.length < productData.length
              }
              checked={
                productData.length > 0 &&
                selectedProducts.length === productData.length
              }
              onChange={handleSelectAllClick}
            />
          </TableCell>
          <TableCell>Image</TableCell>
          <TableCell>
            <Box sx={{ display: "flex", alignItems: "center" }}>Name</Box>
          </TableCell>
          <TableCell>
            <Box sx={{ display: "flex", alignItems: "center" }}>Price</Box>
          </TableCell>
          <TableCell>
            <Box sx={{ display: "flex", alignItems: "center" }}>Status</Box>
          </TableCell>
          <TableCell>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              Permissions
            </Box>
          </TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {productData.map((product) => {
                    const isItemSelected = isSelected(product.id);
                    return (
                      <TableRow
                        hover
                        onClick={() => handleClick(product.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                        key={product.id}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} />
                        </TableCell>
                        <TableCell>
                          <Avatar variant="rounded" src={product.image} alt={product.name} />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <Switch checked={product.status} color="success" />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {product.permissions.map((permission) => (
                              <Chip 
                                key={permission} 
                                label={permission} 
                                size="small" 
                                color={getChipColor(permission)} 
                                variant={['Active', 'Inactive'].includes(permission) ? "outlined" : "filled"}
                              />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" sx={{ mr: 1 }}>
                            <FiEdit size="18" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <FiTrash2 size="18" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })} */
}
//     </TableBody>
//   </Table>
// </TableContainer>

// <Box
//   sx={{
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   }}
// >
//   <Typography variant="body2">Showing 10 of 29 entries</Typography>
//   <Pagination
//     count={3}
//     page={page}
//     onChange={(e, newPage) => setPage(newPage)}
//     size="small"
//     shape="rounded"
//   />
// </Box>
// </Box>; */}
