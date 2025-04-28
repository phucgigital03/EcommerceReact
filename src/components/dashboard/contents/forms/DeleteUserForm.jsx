import { Button } from "@mui/material";
import toast from "react-hot-toast";
import api from "../../../../api/api";

function DeleteUserForm({ address, setAddresses, setOpenDeleteModal }) {

    const handleSubmitDelete = async (addressId)=>{
        try {
            const { data } = await api.delete(`/addresses/${addressId}`, {
                headers: {
                  "Content-Type": "application/json",
                },
            });

            console.log("delete the address: ", data)
            if(data){
                const { data: addressesDB } = await api.get("/addresses");
                setAddresses(addressesDB);
                setOpenDeleteModal(false);
                toast.success(data);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete address");
            console.log("Failed to delete address", error);
        }
    }
  return (
    <div>
      <div>
        <p className="text-red-600"> Are you sure to delete the address with </p>
        <p>BuildingName <strong>{address?.buildingName}</strong></p>
        <p>UserName <strong>{address?.username}</strong></p>
      </div>

      <div className="mt-2 flex gap-x-2 justify-end items-center">
        <Button
          className="min-w-[100px] w-[100px]"
          variant="contained"
          color="primary"
          onClick={() => {setOpenDeleteModal(false)}}
        >
          <span>Cancel</span>
        </Button>
        <Button
          className="min-w-[100px] w-[100px]"
          variant="contained"
          color="error"
          onClick={() => {handleSubmitDelete(address?.addressId)}}
        >
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
}

export default DeleteUserForm;
