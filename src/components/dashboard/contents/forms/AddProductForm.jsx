import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-hot-toast";
import api from "../../../../api/api";

function AddProductForm({
  product,
  categories,
  setOpenProductModal,
  setProducts,
}) {
  const [imagePreview, setImagePreview] = useState(product?.image || null);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
    control,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      productName: product?.productName || "",
      price: product?.price || "",
      discount: product?.discount || 0,
      quantity: product?.quantity || 1,
      description: product?.description || "",
      categoryId: product?.categoryId || categories?.[0]?.categoryId || 1,
      //   imageFile: undefined,
    },
  });

  const handleImageChange = (e) => {
    console.log("change image");
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      clearErrors("imageFile");
    }
  };

  const handleSubmitImage = async (productId) => {
    const formValues = getValues(); // Gets all current form values
    const imageFile = formValues.imageFile?.[0];
    if (!imageFile) {
      setError("imageFile", {
        type: "manual",
        message: "Please select an image before changing.",
      });
      return;
    }

    console.log("change image only", imageFile);
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const { data } = await api.put(`/products/${productId}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Image updated successfully");
      if (data) {
        // Fetch updated products list
        const { data: productsDB } = await api.get("/public/products");
        console.log("AddProductForm: ", productsDB);
        setProducts(productsDB?.content ? productsDB?.content : []);
        setOpenProductModal(false);
      }
    } catch (error) {
      toast.error("Failed to update image");
      console.log("Failed to update image", error);
    }
  };

  const submitProductHandler = async (sendData) => {
    try {
      console.log("click add update: productID ", product?.productId);
      const productId = product?.productId;
      let productDB = null;

      if (productId) {
        const { data } = await api.put(
          `/admin/products/${productId}`,
          sendData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        productDB = data;
      } else {
        // Create FormData object to handle file upload
        const formData = new FormData();

        // append fields
        formData.append(
          "productDTO",
          new Blob(
            [
              JSON.stringify({
                productName: sendData.productName,
                price: sendData.price,
                discount: sendData.discount,
                quantity: sendData.quantity,
                description: sendData.description,
              }),
            ],
            { type: "application/json" }
          )
        );
        // sendData.imageFile is a FileList, so take the first file
        formData.append("imageFile", sendData.imageFile?.[0]);

        // In ra tất cả key/value trong FormData
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }

        console.log(sendData);

        const { data } = await api.post(
          `/admin/categories/${sendData?.categoryId}/productWithImage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        productDB = data;
      }

      if (productDB) {
        // Fetch updated products list
        const { data: productsDB } = await api.get("/public/products");
        console.log("AddProductForm: ", productsDB);
        setProducts(productsDB?.content ? productsDB?.content : []);
        setOpenProductModal(false);
        toast.success(
          productId
            ? "Product updated successfully"
            : "Product added successfully"
        );
      }
    } catch (error) {
      toast.error("Failed to handle product");
      console.log("Failed to handle product", error);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(submitProductHandler)} className="">
        <div className="flex items-center justify-center mb-4">
          <MdAddShoppingCart size={50} />
          <h1 className="text-slate-600 font-bold font-montserrat text-center sm:text-3xl text-xl">
            {!product?.productId ? "Add Product" : "Update Product"}
          </h1>
        </div>
        <hr className="mt-4 h-2" />

        <div className="flex gap-4">
          {/* at form Left */}
          <div className="flex-[50%]">
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="productName"
                placeholder="Enter product name"
                className={`w-full p-2 border rounded-md ${
                  errors.productName ? "border-red-500" : "border-gray-300"
                }`}
                {...register("productName", {
                  required: "Product name is required",
                })}
              />
              {errors.productName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.productName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                placeholder="Enter price"
                className={`w-full p-2 border rounded-md ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Discount (%)
              </label>
              <input
                type="number"
                id="discount"
                placeholder="Enter discount percentage"
                className={`w-full p-2 border rounded-md ${
                  errors.discount ? "border-red-500" : "border-gray-300"
                }`}
                {...register("discount", {
                  min: { value: 0, message: "Discount cannot be negative" },
                  max: { value: 100, message: "Discount cannot exceed 100%" },
                })}
              />
              {errors.discount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.discount.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category<span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                className={`w-full p-2 border rounded-md ${
                  errors.categoryId ? "border-red-500" : "border-gray-300"
                }`}
                {...register("categoryId", {
                  required: "Category is required",
                })}
              >
                {/* <option value="">Select a category</option> */}
                {categories?.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </div>

          {/* at form Right */}
          <div className="flex-[50%]">
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                placeholder="Enter quantity"
                className={`w-full p-2 border rounded-md ${
                  errors.quantity ? "border-red-500" : "border-gray-300"
                }`}
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Quantity must be at least 1" },
                })}
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description<span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                rows="4"
                className={`w-full p-2 border rounded-md ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Image<span className="text-red-500">*</span>
              </label>
              <Controller
                name="imageFile"
                control={control}
                rules={{
                  validate: (value) => {
                    if (product?.image) {
                      return true;
                    }
                    return (
                      (value && value.length > 0) || "Product image is required"
                    );
                  },
                }}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files); // RHF’s onChange
                      handleImageChange(e); // your preview
                    }}
                  />
                )}
              />
              {errors.imageFile && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.imageFile.message}
                </p>
              )}

              <div className="flex justify-start items-end">
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-32 h-32 object-cover border rounded-md"
                    />
                  </div>
                )}
                {product?.productId && (
                  <button
                    type="button"
                    className="ml-4 mt-2 py-2 px-2 flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition-colors duration-200"
                    onClick={() => {
                      handleSubmitImage(product?.productId);
                    }}
                  >
                    Change Image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-10 mb-4 py-2 text-2xl w-full flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition-colors duration-200"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
