import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loader from "../shared/Loader";
import { FaCheckCircle } from "react-icons/fa";
import { stripePaymentConfirmation } from "../../store/actions";
import toast from "react-hot-toast";

function PaymentConfirm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); //location.search to get query params like ?param1=1
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state) => state.carts);
  const { selectedUserAddress } = useSelector((state) => state.auth);

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart?.length > 0
    ) {
      const sendData = {
        addressId: selectedUserAddress?.addressId,
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
      };
      console.log("selectedUserAddress: ", selectedUserAddress);
      dispatch(
        stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast)
      );
    }
  }, [paymentIntent, clientSecret, redirectStatus, cart]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      {loading ? (
        <div className="max-w-xl mx-auto">
          <Loader />
        </div>
      ) : (
        <div>
          {errorMessage ? (
            <div className="max-w-xl mx-auto">
              <h2 className="text-red-500">{errorMessage}</h2>
            </div>
          ) : (
            <div className="p-8 rounded-lg shadow-lg text-center max-w-md flex flex-col justify-center items-center">
              <div className="text-green-500 mb-4 flex justify-center">
                <FaCheckCircle size={64} />
              </div>
              <h2 className="text-3xl font-semibold mb-2 text-gray-800">
                Payment successfull!
              </h2>
              <p className="text-gray-600">
                Thank you for your purchase! Your payment was successful and we
                are processing your order
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PaymentConfirm;
