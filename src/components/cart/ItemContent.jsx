import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../../store/actions";
import toast from "react-hot-toast";

function ItemContent({
  description,
  discount,
  image,
  price,
  productId,
  productName,
  quantity,
  specialPrice,
  cartId,
}) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const handleQtyIncrease = (product) => {
    dispatch(
      increaseCartQuantity(product, toast, currentQuantity, setCurrentQuantity)
    );
  };

  const handleQtyDecrease = (product) => {
    if(currentQuantity > 1){
        const newQuantity = currentQuantity - 1;
        setCurrentQuantity(newQuantity)
        dispatch(decreaseCartQuantity(product,newQuantity,toast))
    }
  };

  const removeProductInCart = (product) => {
    dispatch(removeFromCart(product,toast))
  }

  console.log("current Qty",currentQuantity, productName)
  console.log("quantity",quantity,productName)

  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm items-center border-[1px] border-slate-200 rounded-md lg:px-4 py-4 p-2">
      <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
        <div className="flex md:flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
          <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
            {productName}
          </h3>
        </div>

        <div className="md:w-36 sm:w-24 w-12">
          <img
            src={image}
            alt="item content"
            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
          />
          <div className="flex items-start gap-5 mt-3">
            <button
              onClick={() => removeProductInCart({
                description,
                discount,
                image,
                price,
                productId,
                productName,
                quantity,
                specialPrice,
              })}
              className="flex items-center font-semibold space-x-2 px-4 py-1 border border-rose-600 rounded-md hover:bg-red-50 transition-colors duration-300"
            >
              <HiOutlineTrash size={16} className="text-red-600" />
              <span className="text-red-600">Remove</span>
            </button>
          </div>
        </div>
      </div>

      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {Number(specialPrice)}
      </div>

      <div className="justify-self-center">
        <SetQuantity
          quantity={currentQuantity}
          cardCounter={true}
          handleQtyIncrease={() => {
            handleQtyIncrease({
              description,
              discount,
              image,
              price,
              productId,
              productName,
              quantity,
              specialPrice,
            });
          }}
          handleQtyDecrease={() => {handleQtyDecrease({
            description,
            discount,
            image,
            price,
            productId,
            productName,
            quantity,
            specialPrice,
          })}}
        />
      </div>

      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {Number(currentQuantity) * Number(specialPrice)}
      </div>
    </div>
  );
}

export default ItemContent;
