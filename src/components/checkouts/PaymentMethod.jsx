import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUserCart, selectCheckoutPayment } from "../../store/actions";
import { useEffect } from "react";

function PaymentMethod() {
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart,cartId } = useSelector((state) => state.carts);
  const { isLoading,errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(cart.length > 0 && !cartId && !errorMessage){
        const cartItems = cart.map((item)=>{
            return {
                productId: item.productId,
                quantity: item.quantity
            }
        })
        dispatch(createUserCart(cartItems))
        console.log(3)
    }
  },[dispatch,cartId])

  const handleChange = (e)=>{
    dispatch(selectCheckoutPayment(e.target.value))
  }

  return (
    <div 
        style={{boxShadow: "0.3px 0.3px 4.4px 1.4px gray"}}
        className="rounded-md py-10 px-4 max-w-md mx-auto flex flex-col justify-center items-center"
    >
      <h1 className="mb-[12px] text-center text-2xl font-semibold text-gray-500">
        Select payment method
      </h1>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={paymentMethod}
          onChange={handleChange}
        >
          <FormControlLabel value="Stripe" control={<Radio />} label="Stripe" />
          <FormControlLabel value="Paypal" control={<Radio />} label="Paypal" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default PaymentMethod;
