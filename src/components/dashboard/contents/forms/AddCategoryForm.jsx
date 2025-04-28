import { IoMdLogIn } from "react-icons/io";
import { useForm } from "react-hook-form";
import InputField from "../../../shared/InputField";
import CheckBoxField from "../../../shared/CheckBoxField";
import api from "../../../../api/api";
import toast from "react-hot-toast";

function AddCategoryForm({ category,setCategories, setOpenCategoryModal }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
        categoryName: category?.categoryName || "",
    },
  });

  const submitNewAddressHandler = async (sendData) => {
    try {
        console.log("click add update: categoryId ", category?.categoryId);
        const categoryId = category?.categoryId;
        let categoryDB = null;

        if(categoryId){
            // public/categories/2
            const { data } = await api.put(`/public/categories/${categoryId}`, sendData);
            categoryDB = data;
        }else{
            // 
            const { data } = await api.post('/admin/categories', sendData);
            categoryDB = data;
        }

        if(categoryDB){
            const { data: categoryDBs } = await api.get("/public/categories");
            console.log("AddCategoryForm: ",categoryDBs);
            setCategories(categoryDBs?.content ? categoryDBs?.content : []);
            setOpenCategoryModal(false);
            toast.success(categoryId ? "Update category successfully" : "Add category successfully");
        }
        
    } catch (error) {
        toast.error("Failed to handle category")
        console.log("Failed to handle category", error)
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(submitNewAddressHandler)} className="">
        <div className="flex items-center justify-center mb-4">
          <IoMdLogIn size={50} />
          <h1 className="text-slate-600 font-bold font-montserrat text-center sm:text-3xl text-xl">
            {!category?.categoryId ? "Add Category" : "Update Category"}
          </h1>
        </div>
        <hr className="mt-4 h-2" />
        <div className="flex flex-col gap-4">
          <InputField
            id={"categoryName"}
            type={"categoryName"}
            label={"categoryName"}
            required
            placeholder={"Enter your categoryName"}
            register={register}
            errors={errors}
            message={"categoryName is required"}
          />
        </div>
        <button
          className="mt-10 mb-4 py-2 text-2xl w-full flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition-colors duration-200"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCategoryForm;
