import { IoMdLogIn } from "react-icons/io";
import { useForm } from "react-hook-form";
import InputField from "../../../shared/InputField";
import CheckBoxField from "../../../shared/CheckBoxField";
import api from "../../../../api/api";
import toast from "react-hot-toast";

// "username": "user7",
// "email": "user7gmail@gmail.com",
// "role": ["admin1233"],
// "password": "123456"

function AddUserForm({ user, roleDBs ,setOpenUserModal, setUsers }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
        role: [], // Store selected checkboxes
    },
  });

  const submitNewUserHandler = async (sendData) => {
    try {
        console.log("AddUserForm: ",sendData);
        const { data } = await api.post('/auth/signup', sendData);
        if(data){
            const { data: userDBs } = await api.get("/users");
            console.log("AddUserForm: ",userDBs);
            setUsers(userDBs);
            setOpenUserModal(false);
            toast.success("Add user successfully")
        }
    } catch (error) {
        toast.error("Failed to create user")
        console.log("Failed to create user", error)
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(submitNewUserHandler)} className="">
        <div className="flex items-center justify-center mb-4">
          <IoMdLogIn size={50} />
          <h1 className="text-slate-600 font-bold font-montserrat text-center sm:text-3xl text-xl">
            {!user?.id ? "Add user" : "Update user"}
          </h1>
        </div>
        <hr className="mt-4 h-2" />
        <div className="flex flex-col gap-4">
          <InputField
            id={"username"}
            type={"text"}
            label={"User Name"}
            required
            placeholder={"Enter your user name"}
            register={register}
            errors={errors}
            message={"user name is required"}
          />
          <InputField
            id={"email"}
            type={"email"}
            label={"Email"}
            required
            placeholder={"Enter your email"}
            register={register}
            errors={errors}
            message={"email is required"}
          />
          <InputField
            id={"password"}
            type={"password"}
            label={"Password"}
            required
            placeholder={"Enter your password"}
            register={register}
            errors={errors}
            message={"password is required"}
          />
          <CheckBoxField
            id={"role"}
            label={"Roles"}
            errors={errors}
            options={roleDBs}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
        <button
          //   disabled={btnLoader}
          className="mt-10 mb-4 py-2 text-2xl w-full flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition-colors duration-200"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AddUserForm;
