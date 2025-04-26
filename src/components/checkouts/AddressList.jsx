import { FaBuilding, FaCheckCircle, FaEdit, FaStreetView, FaTrash } from "react-icons/fa";
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectUserCheckoutAddress } from "../../store/actions";

function AddressList({ addresses, setOpenAddressModal, setSelectedAddress,setOpenDeleteModal }) {
  const dispatch = useDispatch();
  const {selectedUserAddress} = useSelector(state => state.auth);

  const handleAddressSelection = (data) => {
    console.log(data);
    dispatch(selectUserCheckoutAddress(data))
  };

  const onEditButtonHandle = (data)=>{
    setSelectedAddress(data)
    setOpenAddressModal(true)
  }

  const onDeleteButtonHandle = (date)=>{
    setSelectedAddress(date)
    setOpenDeleteModal(true)
  }

//   console.log(selectedUserAddress)

  return (
    <div className="space-y-4">
      {addresses.map((address) => {
        return (
          <div
            key={address.addressId}
            onClick={() => {
              handleAddressSelection(address);
            }}
            className={`p-4 border rounded-md cursor-pointer relative ${
              selectedUserAddress?.addressId === address.addressId
                ? "bg-green-100"
                : "bg-white"
            }`}
          >
            <div className="flex items-start">
              <div className="space-y-1">
                <div className="flex items-center">
                  <FaBuilding size={16} className="mr-2 text-gray-600" />
                  <p className="font-semibold">{address.buildingName}</p>
                  {selectedUserAddress?.addressId === address.addressId && (
                    <FaCheckCircle className="text-green-500 ml-2" />
                  )}
                </div>
                <div className="flex items-center">
                  <FaStreetView size={16} className="mr-2 text-gray-600" />
                  <p className="font-semibold">{address.receivePhone}</p>
                </div>
                <div className="flex items-center">
                  <FaStreetView size={16} className="mr-2 text-gray-600" />
                  <p className="font-semibold">{address.street}</p>
                </div>
                <div className="flex items-center">
                  <MdLocationCity size={16} className="mr-2 text-gray-600" />
                  <p className="font-semibold">
                    {address.city}, {address.state}
                  </p>
                </div>
                <div className="flex items-center">
                  <MdPinDrop size={16} className="mr-2 text-gray-600" />
                  <p className="font-semibold">{address.pincode}</p>
                </div>
                <div className="flex items-center">
                  <MdPublic size={16} className="mr-2 text-gray-600" />
                  <p className="font-semibold">{address.country}</p>
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-2 flex gap-3">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onEditButtonHandle(address)
                    }}
                >
                    <FaEdit size={18} className="text-teal-700"/>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onDeleteButtonHandle(address)
                    }}
                >
                    <FaTrash size={18} className="text-rose-600"/>
                </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AddressList;
