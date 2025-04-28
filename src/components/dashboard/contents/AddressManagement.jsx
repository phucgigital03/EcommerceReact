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
import AddAdressForm from "../../checkouts/AddAdressForm";
import DeleteAddressForm from "./forms/DeleteAddressForm";

function AddressManagement() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [openModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal,setOpenDeleteModal] = useState(false);
  const [selectedAddress, setselectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/addresses");
        setAddresses(data);
        setErrorMessage(null);
      } catch (error) {
        console.log("Failed to fecth addresses: ", error?.message);
        setErrorMessage("Failed to fecth addresses");
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddAddress = () => {
    setselectedAddress(null);
    setOpenAddressModal(true);
  };

  const handleEdit = (addressId)=>{
    console.log(addressId);
    const chosenAddress = addresses.find(address => address.addressId == addressId);
    if(chosenAddress){
      setselectedAddress(chosenAddress);
      setOpenAddressModal(true);
    }
  }

  const handleDelete = (addressId)=>{
    console.log(addressId);
    const chosenAddress = addresses.find(address => address.addressId == addressId);
    if(chosenAddress){
      setselectedAddress(chosenAddress);
      setOpenDeleteModal(true);
    }
  }

  if(errorMessage){
    return <div>{errorMessage}</div>
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Address Management
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
            <InputLabel id="category-select-label">Addresses</InputLabel>
            <Select
              className="h-[42px] ml-2"
              labelId="category-select-label"
              id="category-select"
              value={"All"}
              label={"Addresses"}
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
            handleAddAddress();
          }}
        >
          <span>Add Address</span>
        </Button>

        <GeneralModal customStyle={{maxWidth: "800px"}} open={openModal} setOpen={setOpenAddressModal}>
          <AddAdressForm
            pageAdmin={true}
            address={selectedAddress}
            setAdresses={setAddresses}
            setOpenAddressModal={setOpenAddressModal}
          />
        </GeneralModal>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Street</TableCell>
              <TableCell>Building Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Pincode</TableCell>
              <TableCell>Receive Phone</TableCell>
              <TableCell>User name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addresses.map((address) => (
              <TableRow key={address.addressId} hover>
                <TableCell>{address.street}</TableCell>
                <TableCell>{address.buildingName}</TableCell>
                <TableCell>{address.city}</TableCell>
                <TableCell>{address.state}</TableCell>
                <TableCell>{address.country}</TableCell>
                <TableCell>{address.pincode}</TableCell>
                <TableCell>{address.receivePhone}</TableCell>
                <TableCell>{address.username}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleEdit(address?.addressId)
                    }}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(address?.addressId)}
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
        /* open delete address */
        <GeneralModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
        >
          <DeleteAddressForm
            address={selectedAddress}
            setAddresses={setAddresses}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        </GeneralModal>
      }
    </Box>
  );
}

export default AddressManagement;
