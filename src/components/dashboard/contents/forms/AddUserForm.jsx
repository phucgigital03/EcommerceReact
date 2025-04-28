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

function AddUserForm({ user, roleDBs, setOpenUserModal, setUsers }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      role:  user?.roles?.map(role => {
        if(role.roleName == "ROLE_USER"){
          return "user"
        }else if(role.roleName == "ROLE_SELLER") {
          return "seller"
        }
      }) || ["user"], // Store selected checkboxes
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  const submitNewUserHandler = async (sendData) => {
    try {
      const userId = user?.id;
      let userDB = null;

      if(userId){
        // 
        const { data } = await api.put(`users/${userId}`, sendData);
        userDB = data;
      }else{
        // 
        const { data } = await api.post("/auth/signup", sendData);
        userDB = data;
      }

      
      if (userDB) {
        const { data: userDBs } = await api.get("/users");
        console.log("AddUserForm: ", userDBs);
        setUsers(userDBs);
        setOpenUserModal(false);
        toast.success(userId ? "Update user successfully" : "Add user successfully");
      }
    } catch (error) {
      toast.error("Failed to handle user");
      console.log("Failed to handle user", error);
    }
  };

  // console.log("roleDBs", roleDBs);
  // console.log("user", user);

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
          {!user?.id && (
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
          )}
          <CheckBoxField
            id={"role"}
            label={"Roles"}
            errors={errors}
            options={roleDBs}
            register={register}
            setValue={setValue}
            getValues={getValues}
            setError={setError}
            clearErrors={clearErrors}
          />
        </div>
        <button className="mt-10 mb-4 py-2 text-2xl w-full flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition-colors duration-200">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddUserForm;
