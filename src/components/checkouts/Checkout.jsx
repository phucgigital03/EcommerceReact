import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddress } from "../../store/actions";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";
import ErrorPage from "../shared/ErrorPage";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import StripePayment from "./StripePayment";
import PaypalPayment from "./PaypalPayment";
import api from "../../api/api";

function Checkout() {
  const dispatch = useDispatch();
  const { addresses, selectedUserAddress } = useSelector((state) => state.auth);
  const { paymentMethod } = useSelector(state => state.payment);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { cart,totalPrice } = useSelector((state) => state.carts);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Address", "Payment method", "Order summary", "Payment"];

  useEffect(() => {
    dispatch(getUserAddress());
  }, [dispatch]);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleNext = async () => {
    if (activeStep === 0 && !selectedUserAddress) {
      toast.error("Please select address before!");
      return;
    }
    if (activeStep === 1 && !paymentMethod) {
      toast.error("Please select payment method before!");
      return;
    }
    if(activeStep === 2 && paymentMethod === "VNPay"){
      console.log("handle VNPay payment")
      const { data } = await api.post("/order/users/payments/vn-pay/online",{
        addressId: selectedUserAddress?.addressId 
      })
      console.log(data)
      window.location.href = data?.vnPayRes?.vnpUrl
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };
  console.log("check out")

  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((item) => (
          <Step key={item}>
            <StepLabel>{item}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isLoading ? (
        <div className="mt-5">
            <Loader/>
        </div>
      ) : (
        <div className="mt-5">
          {activeStep === 0 && <AddressInfo addresses={addresses} />}
          {activeStep === 1 && <PaymentMethod/>}
          {activeStep === 2 && <OrderSummary
              cart={cart}
              totalPrice={totalPrice}
              address={selectedUserAddress}
              paymentMethod={paymentMethod}
          />}
          {activeStep === 3 && 
              <>
                {
                  paymentMethod === "Stripe" ? (
                    <StripePayment/>
                  ) : (
                    <PaypalPayment/>
                  )
                }
              </>
          }
        </div>
      )}

      <div className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 w-full max-w-[100vw] bg-white shadow-gray-400">
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep !== steps.length - 1 && (
          <button
            disabled={
              errorMessage ||
              (activeStep === 0
                ? !selectedUserAddress
                : activeStep === 1
                ? !paymentMethod
                : false)
            }
            className={`bg-customBlue font-semibold px-6 h-10 rounded-md text-white
                                ${
                                  errorMessage ||
                                  (activeStep === 0 && !selectedUserAddress) ||
                                  (activeStep === 1 && !paymentMethod)
                                    ? "opacity-60"
                                    : ""
                                }
                            `}
            onClick={handleNext}
          >
            Proceed
          </button>
        )}
      </div>
      {errorMessage && <ErrorPage message={errorMessage}/>}
    </div>
  );
}

export default Checkout;
