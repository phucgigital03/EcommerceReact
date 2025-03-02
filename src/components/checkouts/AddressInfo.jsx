import { useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import AddressInfoModal from "./AddressInfoModal";
import AddAdressForm from "./AddAdressForm";



function AddressInfo() {
    const [openAddressModal,setOpenAddressModal] = useState(false);
    const [selectedAddress,setSelectedAddress] = useState("");

    const noAddressExist = true;
    const isLoading = false;

    const addNewAddressHandler = ()=>{
        setSelectedAddress("")
        setOpenAddressModal(true)
    }
  return (
    <div className="pt-4">
        {
            noAddressExist
            ? (
                <div className="max-w-md mx-auto p-6 rounded-lg flex flex-col items-center justify-center">
                    <FaAddressBook size={50} className="text-gray-500 mb-5"/>
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
            ) 
            : (
                <div className="relative mx-auto max-w-md p-6 rounded-lg">
                    <h1 className="font-bold text-2xl text-slate-800 text-center">
                        Select Address
                    </h1>

                    {
                        isLoading 
                        ? (
                            <div className="py-4 px-8">
                                <p>Loading...</p>
                            </div>
                        )
                        : (
                            <div className="space-y-4 pt-6">
                                <p>Address list here...</p>
                            </div>
                        )
                    }
                </div>
            )
        }

        <AddressInfoModal
            open={openAddressModal}
            setOpen={setOpenAddressModal}
        >
            <AddAdressForm/>
        </AddressInfoModal>
    </div>
  )
}

export default AddressInfo
