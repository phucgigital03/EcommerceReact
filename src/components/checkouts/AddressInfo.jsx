import { useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import AddressInfoModal from "./AddressInfoModal";
import AddAdressForm from "./AddAdressForm";
import AddressList from "./AddressList";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "./DeleteModal";
import { deleteUserAddress } from "../../store/actions";
import toast from "react-hot-toast";

function AddressInfo({ addresses }) {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const { isLoading, btnLoader } = useSelector(state => state.errors);
  const noAddressExist = !addresses || addresses.length === 0;
  const dispatch = useDispatch();

  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };

  const onDeleteUserAddressHanlder = ()=>{
    dispatch(deleteUserAddress(
      toast,
      selectedAddress?.addressId,
      setOpenDeleteModal
    ))
  }

  console.log("Address Info")
  
  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div className="max-w-md mx-auto p-6 rounded-lg flex flex-col items-center justify-center">
          <FaAddressBook size={50} className="text-gray-500 mb-5" />
          <h1 className="mb-2 font-bold text-2xl text-slate-800 text-center">
            No address added yet
          </h1>
          <p className="mb-6 font-bold text-slate-500">
            Please add your address to complete purchase
          </p>
          <button
            onClick={addNewAddressHandler}
            className="py-2 px-4 bg-blue-600 text-white rounded-sm font-medium hover:bg-blue-400 transition-colors"
          >
            Add address
          </button>
        </div>
      ) : (
        <div className="relative mx-auto max-w-md p-6 rounded-lg">
          <h1 className="font-bold text-2xl text-slate-800 text-center">
            Select Shipping Address
          </h1>

          {isLoading ? (
            <div className="py-4 px-8">
              <p>Loading...</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 pt-6">
                <AddressList
                  addresses={addresses}
                  setOpenAddressModal={setOpenAddressModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                  setSelectedAddress={setSelectedAddress}
                />
              </div>

              {addresses.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={addNewAddressHandler}
                    className="py-2 px-4 bg-blue-600 text-white rounded-sm font-medium hover:bg-blue-400 transition-colors"
                  >
                    Add address
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddAdressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loader={btnLoader}
        address={selectedAddress}
        onDeleteUserAddress={onDeleteUserAddressHanlder}
      />

    </div>
  );
}

export default AddressInfo;
