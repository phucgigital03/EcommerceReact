import { Button } from "@mui/material";
import toast from "react-hot-toast";
import api from "../../../../api/api";

function DeleteProductForm({ product, setProducts, setOpenDeleteModal }) {

    const handleSubmitDelete = async (productId)=>{
        try {
            const { data } = await api.delete(`/admin/softProduct/${productId}`, {
                headers: {
                  "Content-Type": "application/json",
                },
            });

            console.log("delete the product: ", data)
            if(data){
                const { data: productsDB } = await api.get("/public/products");
                setProducts(productsDB?.content ? 
                  productsDB?.content?.filter(product => !product.deleted) : []
                );
                setOpenDeleteModal(false);
                toast.success(data);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete product");
            console.log("Failed to delete product", error);
        }
    }
  return (
    <div>
      <div>
        <p className="text-red-600"> Are you sure to delete the product with </p>
        <p>Product Name: <strong>{product?.productName}</strong></p>
        <p className="w-fit"><img className="w-[200px] h-[200px]" src={product?.image} alt="productImg" /></p>
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
          onClick={() => {handleSubmitDelete(product?.productId)}}
        >
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
}

export default DeleteProductForm;
