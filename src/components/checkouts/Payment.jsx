import { Alert, AlertTitle } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import { useEffect } from "react";
import { createStripeClientSecret } from "../../store/actions";
import Loader from "../shared/Loader";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function Payment({ title, description }) {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(()=>{
    if(!clientSecret && totalPrice){
      console.log("payment line 21: ",clientSecret)
      dispatch(createStripeClientSecret(totalPrice))
    }
    console.log("payment: ",totalPrice)
    console.log("payment line 25: ",clientSecret)
  },[clientSecret,totalPrice])


  if(isLoading){
    return <div className="max-w-lg mx-auto">
      <Loader/>
    </div>
  }

  if(title === "Stripe unavailable"){
    return <>
      {clientSecret && 
        <Elements stripe={stripePromise} options={{clientSecret}}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice}/>
        </Elements>
      }
      </>;
  }
  return <div className="max-w-lg mx-auto mt-4 flex justify-center">
    <h2 className="text-red-500 text-xl font-semibold">Payment method is unavailable</h2>
  </div>
}

export default Payment;
