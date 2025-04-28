import { useEffect, useState } from "react";
import api from "../../../api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import GeneralModal from "../../shared/GeneralModal";
import AddCategoryForm from "./forms/AddCategoryForm";
import DeleteCategoryForm from "./forms/DeleteCategoryForm";


function CategoryManagement() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [openModal, setOpenCategoryModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/public/categories");

        setCategories(data?.content ? data?.content : []);
        setErrorMessage(null);
      } catch (error) {
        console.log("Failed to fecth categories: ", error?.message);
        setErrorMessage("Failed to fecth categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setselectedCategory(null);
    setOpenCategoryModal(true);
  };

  const handleEdit = (categoryId) => {
    const chosenCategory = categories.find(
      (Category) => Category.categoryId == categoryId
    );
    if (chosenCategory) {
      setselectedCategory(chosenCategory);
      setOpenCategoryModal(true);
    }
  };

  const handleDelete = (categoryId) => {
    console.log(categoryId);
    const chosenCategory = categories.find(
      (category) => category.categoryId == categoryId
    );
    if (chosenCategory) {
      setselectedCategory(chosenCategory);
      setOpenDeleteModal(true);
    }
  };

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Category Management
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
              placeholder="Search for what you want"
            />
            <FiSearch className="absolute left-3 text-slate-800 size={30}" />
          </div>
          <FormControl className="w-[120px]">
            <InputLabel id="category-select-label">Categories</InputLabel>
            <Select
              className="h-[42px] ml-2"
              labelId="category-select-label"
              id="category-select"
              value={"All"}
              label={"Categories"}
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
            handleAddCategory();
          }}
        >
          <span>Add Category</span>
        </Button>

        <GeneralModal
          // customStyle={{ maxWidth: "800px" }}
          open={openModal}
          setOpen={setOpenCategoryModal}
        >
          <AddCategoryForm
            category={selectedCategory}
            setOpenCategoryModal={setOpenCategoryModal}
            setCategories={setCategories}
          />
        </GeneralModal>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.categoryId} hover>
                <TableCell>{category.categoryId}</TableCell>
                <TableCell>{category.categoryName}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleEdit(category?.categoryId);
                    }}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      handleDelete(category?.categoryId)
                    }}
                  >
                    <FaTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {
        /* open delete Category */
        <GeneralModal open={openDeleteModal} setOpen={setOpenDeleteModal}>
          <DeleteCategoryForm
            category={selectedCategory}
            setCategories={setCategories}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        </GeneralModal>
      }
    </Box>
  );
}

export default CategoryManagement;
