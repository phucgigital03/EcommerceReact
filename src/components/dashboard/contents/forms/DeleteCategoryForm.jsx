import { Button } from "@mui/material";
import toast from "react-hot-toast";
import api from "../../../../api/api";

function DeleteCategoryForm({ category, setCategories, setOpenDeleteModal }) {

    const handleSubmitDelete = async (categoryId)=>{
        try {
            const { data } = await api.delete(`admin/categories/${categoryId}`, {
                headers: {
                  "Content-Type": "application/json",
                },
            });

            console.log("delete the category: ", data)
            if(data){
              const { data: categoryDBs } = await api.get("/public/categories");
              console.log("AddCategoryForm: ",categoryDBs);
              setCategories(categoryDBs?.content ? categoryDBs?.content : []);
              setOpenDeleteModal(false);
              toast.success("Delete category successfully");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete category");
            console.log("Failed to delete category", error);
        }
    }
  return (
    <div>
      <div>
        <p className="text-red-600"> Are you sure to delete the category with </p>
        <p>categoryName <strong>{category?.categoryName}</strong></p>
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
          onClick={() => {handleSubmitDelete(category?.categoryId)}}
        >
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
}

export default DeleteCategoryForm;
