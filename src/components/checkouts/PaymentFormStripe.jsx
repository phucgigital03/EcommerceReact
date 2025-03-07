import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Loader from "../shared/Loader";
import { formatPrice } from "../../utils/formatPrice";
import { useSelector } from "react-redux";

function PaymentFormStripe({ clientSecret, totalPrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const { selectedUserAddress } = useSelector(state => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(selectedUserAddress)
    if(!stripe || !elements){
      return;
    }

    const { error: submitError } = await elements.submit();
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`
      }
    })

    if(error){
      setErrorMessage(error.message)
      return false;
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const loading = !stripe || !elements || !clientSecret

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="font-semibold text-2xl mb-4">Payment Information</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          {clientSecret && <PaymentElement options={paymentElementOptions} />}
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
          <button
            className="w-full bg-black text-white rounded-md px-5 py-[10px] mt-2 font-bold disabled:opacity-25 disabled:animate-pulse"
            disabled={!stripe || loading}
          >
            {!loading ? `Pay ${formatPrice(totalPrice)}` : "Processing"}
          </button>
        </>
      )}
    </form>
  );
}

export default PaymentFormStripe;
