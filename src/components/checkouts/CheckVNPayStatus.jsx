import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { vnpayPaymentConfirmation } from "../../store/actions";
import { formatCalculatePrice, formatPrice } from "../../utils/formatPrice";

function CheckVNPayStatus() {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const location = useLocation();
  const [status, setStatus] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const responseCode = queryParams.get("vnp_ResponseCode");
    const transactionStatus = queryParams.get("vnp_TransactionStatus");
    const amount = queryParams.get("vnp_Amount") / 100; // Convert to VND

    if (responseCode === "00" && transactionStatus === "00") {
      dispatch(
        vnpayPaymentConfirmation(orderId, setStatus, setCurrentOrder, amount)
      );
    } else {
      setStatus({
        success: false,
        message: "Payment failed. Please try again.",
      });
    }
  }, [location]);

  return (
    <div className="space-y-2 min-h-[100vh] max-w-[800px] my-auto mx-auto flex flex-col justify-center items-center">
      {status ? (
        true ? (
          <>
            <div className="w-full rounded-lg shadow-sm border p-4">
              <h2 className="text-2xl font-semibold">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {"VNPAY"}
              </p>
            </div>
            <div className="w-full rounded-lg shadow-sm border p-4">
              <h2 className="text-2xl font-semibold">Order Items</h2>
              <div className="mt-2 flex flex-col items-start">
                {currentOrder?.orderItems?.map((item) => (
                  <div
                    key={item?.productDTO?.productId}
                    className="flex flex-row items-center"
                  >
                    <img
                      className="w-[60px] h-[60px] object-contain"
                      src={`${import.meta.env.VITE_BACKEND_URL}/images/${item?.productDTO?.image}`}
                      alt="item"
                    />
                    <div className="ml-4">
                      <p className="text-gray-400">{item?.productDTO?.productName}</p>
                      <p className="text-gray-400">
                        {item?.quantity} x {formatPrice(item?.orderedProductPrice)} = $
                        {formatCalculatePrice(item?.orderedProductPrice, item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="success">
              <h3 className="flex justify-start items-center text-green-600">
                <FaCheckCircle size={20} />
                <span className="ml-2 font-semibold">{currentOrder?.orderStatus}</span>
              </h3>
              <p className="text-gray-500 text-sm mb-6">{status.message}</p>
              <p className="text-gray-500 text-sm mb-6">Order confirm has been sent via {currentOrder?.email}</p>
              <Link
                to={"/"}
                className="btn bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-400 transition-colors duration-200"
              >
                Go To Home Page
              </Link>
            </div>
          </>
        ) : (
          <div className="failure">
            <h3 className="flex justify-start items-center text-red-500">
              <IoWarning size={20} />
              <span className="ml-2 font-semibold">VNPay Payment Failed</span>
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Please check your payment method and try again.
            </p>
            <Link
              to={"/checkout"}
              className="btn bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-400 transition-colors duration-200"
            >
              Try again
            </Link>
          </div>
        )
      ) : (
        <p>Processing payment...</p>
      )}
    </div>
  );
}

export default CheckVNPayStatus;
