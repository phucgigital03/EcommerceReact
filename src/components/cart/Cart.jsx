import { MdArrowBack, MdShoppingCart } from "react-icons/md"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";


function Cart() {
  // const dispatch = useDispatch();
  const { cart } = useSelector(state => state.carts)

  const newCart = { ...cart }

  newCart.totalPrice = cart?.reduce(
    (acc,cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity)
  , 0)

  if(!cart || cart.length === 0){
    return <CartEmpty/>
  }

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-10">
      <div className="mb-10 flex flex-col items-center">
        <h1 className="flex items-center text-gray-800 text-4xl font-bold">
          <MdShoppingCart size={36}/>
          <span>Your Cart</span>
        </h1>
        <p className="text-gray-400 text-lg mt-2">All your selected items</p>
      </div>

      <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold">
          <div className="md:col-span-2 justify-self-start text-lg text-gray-800">
            Product
          </div>

          <div className="justify-self-center text-lg text-gray-800">
            Price
          </div>

          <div className="justify-self-center text-lg text-gray-800">
            Quantity
          </div>

          <div className="justify-self-center text-lg text-gray-800 ">
            Total
          </div>
      </div>

      <div>
        {
          cart && cart.length > 0 && 
          cart.map((item) => <ItemContent key={item?.productId} {...item}/>)
        }
      </div>

      <div className="border-t-[1.5px] border-slate-200 py-4 flex flex-col sm:flex-row sm:px-0 px-2 sm:justify-between gap-4">
        <div></div>
        <div className="flex flex-col text-sm gap-1">
          <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(Number(newCart?.totalPrice))}</span>
          </div>
          <p className="text-gray-500">Taxes and shipping calculated at checkout</p>
          
          <Link className="w-full flex justify-end" to={"/checkout"}>
            <button 
              className="font-semibold w-[300px] py-2 px-4 rounded-sm bg-blue-500 text-white flex items-center justify-center gap-2 hover:text-gray-400 transition duration-500"
              onClick={()=>{}}
            >
              <MdShoppingCart/>
              Checkout
            </button>
          </Link>

          <Link className="mt-2 flex items-center text-gray-500" to={"/products"}>
            <MdArrowBack/>
            <span>Continue shopping</span>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Cart

