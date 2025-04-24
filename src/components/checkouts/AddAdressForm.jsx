import { useForm } from "react-hook-form";
import { IoMdLogIn } from "react-icons/io";
import InputField from "../shared/InputField";
import Spinner from "../shared/Spinner";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUpdateUserAddress } from "../../store/actions";
import { useEffect } from "react";

// "street": "125 Main St",
// "buildingName": "Sunset Tower",
// "city": "Springfield",
// "state": "Illinois",
// "country": "USA",
// "pincode": "62701"
function AddAdressForm({ address, setOpenAddressModal }) {
  const dispatch = useDispatch();
  const { btnLoader } = useSelector(state => state.errors)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const submitNewAddressHandler = async (data) => {
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal
        ))
  };

  useEffect(()=>{
    if(address?.addressId){
        setValue("buildingName",address.buildingName)
        setValue("city",address.city)
        setValue("state",address.state)
        setValue("country",address.country)
        setValue("pincode",address.pincode)
        setValue("street",address.street)
    }
  },[address])

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(submitNewAddressHandler)}
        className=""
      >
        <div className="flex items-center justify-center mb-4">
          <IoMdLogIn size={50} />
          <h3 className="text-slate-600 font-bold font-montserrat text-center sm:text-xl text-xl">
            {
                !address?.addressId ? "Add shipping address" : "Update shipping address"
            }
          </h3>
        </div>
        <hr className="mt-4 h-2" />
        <div className="flex flex-col gap-4">
          <InputField
            id={"buildingName"}
            type={"text"}
            label={"Building Name"}
            required
            placeholder={"Enter your building name"}
            register={register}
            errors={errors}
            message={"Building name is required"}
          />
          <InputField
            id={"city"}
            type={"text"}
            label={"City"}
            required
            placeholder={"Enter your city"}
            register={register}
            errors={errors}
            message={"city is required"}
          />
          <InputField
            id={"state"}
            type={"text"}
            label={"State"}
            required
            placeholder={"Enter your state"}
            register={register}
            errors={errors}
            message={"state is required"}
          />
          <InputField
            id={"country"}
            type={"text"}
            label={"Country"}
            required
            placeholder={"Enter your country"}
            register={register}
            errors={errors}
            message={"country is required"}
          />
          <InputField
            id={"pincode"}
            type={"text"}
            label={"Pincode"}
            required
            placeholder={"Enter your pincode"}
            register={register}
            errors={errors}
            message={"pincode is required"}
          />
          <InputField
            id={"street"}
            type={"text"}
            label={"Street"}
            required
            placeholder={"Enter your street"}
            register={register}
            errors={errors}
            message={"street is required"}
          />
        </div>
        <button
          disabled={btnLoader}
          className="mt-10 mb-4 py-2 text-2xl w-full flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition-colors duration-200"
        >
          {btnLoader ? (
            <div className="flex flex-row items-center">
              <Spinner /> <span>Loading...</span>
            </div>
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddAdressForm;
