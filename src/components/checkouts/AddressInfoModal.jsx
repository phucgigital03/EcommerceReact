import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";

function AddressInfoModal({ open, setOpen, children }) {
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
        <DialogPanel style={{maxWidth: "800px"}} className="relative w-full max-w-md mx-auto bg-white overflow-hidden transition-all shadow-md rounded-md">
          <div className="px-6 py-6">
            {children}
          </div>
          <div className="absolute px-2 py-2 top-1 right-1">
            <button onClick={() => setOpen(false)}>
                <FaTimes className="text-slate-700" size={25}/>
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default AddressInfoModal;
