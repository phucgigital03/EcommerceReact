import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";


function DeleteModal({ open, setOpen ,loader, address , onDeleteUserAddress}) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="relative w-full max-w-md mx-auto bg-white overflow-hidden transition-all shadow-md rounded-md">
          <div className="px-6 py-6">
            <div className="px-4 py-4">
              <p className="text-gray-400">You really want to delete. Are you sure ? </p>
              <span className="text-sm text-red-400">Address Building Name: {address?.buildingName}</span>
            </div>
            <div className="flex flex-row justify-end items-center space-x-2">
              <button 
                disabled={loader}
                onClick={()=> setOpen(false)}
                className="border border-gray-300 px-2 py-2 rounded-sm hover:bg-gray-400 transition-all duration-150"
              >
                  Cancel
              </button>
              <button 
                disabled={loader}
                onClick={()=> onDeleteUserAddress()}
                className="rounded-sm bg-red-700 text-white px-2 py-2 hover:bg-red-300 transition-all duration-150"
              >
                  Delete
              </button>
            </div>
          </div>
          <div className="absolute px-2 py-2 top-1 right-1">
            <button disabled={loader} onClick={() => setOpen(false)}>
              <FaTimes className="text-slate-700" size={25} />
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default DeleteModal;
