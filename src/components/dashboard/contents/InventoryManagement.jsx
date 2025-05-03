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
import api from "../../../api/api";
import GeneralModal from "../../shared/GeneralModal";
import { formatPrice } from "../../../utils/formatPrice";
import AddProductForm from "./forms/AddProductForm";
import Loader from "../../shared/Loader";
import DeleteProductForm from "./forms/DeleteProductForm";
import { MdFileDownload, MdFileUpload } from "react-icons/md";
import toast from "react-hot-toast";

function InventoryManagement() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [addProductModal, setOpenProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [selectedProduct, setSelectdProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/public/products");
      setProducts(
        data?.content
          ? data?.content?.filter((product) => !product.deleted)
          : []
      );
      setErrorMessage(null);
    } catch (error) {
      console.log("Failed to fecth users: ", error?.message);
      setErrorMessage("Failed to fecth users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleAddProduct = () => {
    setSelectdProduct(null);
    setOpenProductModal(true);
  };

  const handleEdit = (productId) => {
    console.log(productId);
    const chosenProduct = products.find(
      (product) => product.productId == productId
    );
    if (chosenProduct) {
      setSelectdProduct(chosenProduct);
      setOpenProductModal(true);
    }
  };

  const handleDelete = (productId) => {
    console.log(productId);
    const chosenProduct = products.find(
      (product) => product.productId == productId
    );
    if (chosenProduct) {
      setSelectdProduct(chosenProduct);
      setDeleteProductModal(true);
    }
  };

  const handleImportProduct = () => {
    // Create file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".xlsx, .xls, .csv";

    // Handle file selection
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        // Create form data for API request
        const formData = new FormData();
        formData.append("file", file);

        // Show loading indicator
        setLoading(true);

        // Send file to backend API
        const { data } = await api.post('/products/import', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
        console.log("Import product:", data);
        toast.success(`Total item: ${data?.totalItems}, 
          Sucessful item: ${data.successCount},
          Failed item: ${data?.failureCount}
          `
        )
        fetchProducts();
      } catch (error) {
        console.log("Failed to import products: ", error?.message);
        toast.error("Failed to import products: ")
      } finally {
        setLoading(false);
      }
    };

    // Trigger file input click
    fileInput.click();
  };

  const handleExportProduct = () => {};

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        {/* Search and Add User Section */}
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
              label={"Categories"}
              onChange={() => {}}
            >
              <MenuItem value={"All"}>All</MenuItem>
              {categories.map((category) => (
                <MenuItem
                  key={category.categoryId}
                  value={category.categoryName}
                >
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* import and export excel file */}
        <div className="flex justify-between items-center">
          <Button
            className="w-fit"
            variant="contained"
            color="warning"
            startIcon={<MdFileUpload />}
            onClick={() => {
              handleImportProduct();
            }}
            sx={{ marginLeft: "10px" }}
          >
            <span>Import</span>
          </Button>
          <Button
            className="w-fit"
            variant="contained"
            color="success"
            startIcon={<MdFileDownload />}
            onClick={() => {
              handleExportProduct();
            }}
            sx={{ marginLeft: "10px" }}
          >
            <span>Export</span>
          </Button>
          <Button
            className="w-fit"
            variant="contained"
            color="primary"
            startIcon={<FaPlus />}
            onClick={() => {
              handleAddProduct();
            }}
            sx={{ marginLeft: "10px" }}
          >
            <span>Add Product</span>
          </Button>
          <GeneralModal
            customStyle={{ maxWidth: "880px" }}
            open={addProductModal}
            setOpen={setOpenProductModal}
          >
            <AddProductForm
              product={selectedProduct}
              setProducts={setProducts}
              setOpenProductModal={setOpenProductModal}
              categories={categories}
            />
          </GeneralModal>
        </div>
      </Box>

      {loading ? (
        <Loader />
      ) : (
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
                <TableRow key={product.productId}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.productName}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          mr: 2,
                        }}
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
                        {formatPrice(product.specialPrice)}
                      </Typography>
                      {product.discount > 0 && (
                        <Typography
                          variant="caption"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                          }}
                        >
                          {formatPrice(product.price)}
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
                      onClick={() => handleEdit(product?.productId)}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(product.productId)}
                    >
                      <FaTrash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {
        /* open delete product */
        <GeneralModal open={deleteProductModal} setOpen={setDeleteProductModal}>
          <DeleteProductForm
            product={selectedProduct}
            setProducts={setProducts}
            setOpenDeleteModal={setDeleteProductModal}
          />
        </GeneralModal>
      }
    </Box>
  );
}

export default InventoryManagement;
