import { MdArrowBack, MdShoppingCart } from "react-icons/md"
import { Link } from "react-router-dom"



function CartEmpty() {
  return (
    <div
        className="min-h-[800px] flex flex-col justify-center items-center"
    >
        <div className="flex flex-col items-center">
            <MdShoppingCart size={80} className="mb-4 text-slate-500"/>
            <span className="text-3xl font-bold text-slate-700">Your cart is empty</span>
            <span className="text-xl font-bold text-slate-500">Your cart is empty</span>
        </div>

        <div className="mt-6">
            <Link to={"/"} className="flex gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300">
                <MdArrowBack size={16}/>
                <span className="text-sm">Start shopping</span>
            </Link>
        </div>
    </div>
  )
}

export default CartEmpty