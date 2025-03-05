import { formatCalculatePrice, formatPrice } from "../../utils/formatPrice";

function OrderSummary({ cart, address, paymentMethod, totalPrice }) {
  return (
    <div className="container mx-auto px-4 ">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 pr-4">
          <div className="space-y-4">
            <div className="rounded-lg shadow-sm border p-4">
              <h2 className="text-2xl font-semibold">Billing Address</h2>
              <p>
                <strong>Building Name: </strong>
                {address?.buildingName}
              </p>
              <p>
                <strong>Street: </strong>
                {address?.street}
              </p>
              <p>
                <strong>City: </strong>
                {address?.city}
              </p>
              <p>
                <strong>State: </strong>
                {address?.state}
              </p>
              <p>
                <strong>Country: </strong>
                {address?.country}
              </p>
            </div>
            <div className="rounded-lg shadow-sm border p-4">
              <h2 className="text-2xl font-semibold">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </div>
            <div className="rounded-lg shadow-sm border p-4">
              <h2 className="text-2xl font-semibold">Order Items</h2>
              <div className="mt-2 flex flex-col items-start">
                {
                    cart.map(item => (
                        <div key={item.productId} className="flex flex-row items-center">
                            <img className="w-[60px] h-[60px] object-contain" src={item.image} alt="item" />
                            <div className="ml-4">
                                <p className="text-gray-400">{item.productName}</p>
                                <p className="text-gray-400">
                                    {item.quantity} x {formatPrice(item.specialPrice)} = ${
                                        formatCalculatePrice(item.specialPrice,item.quantity)
                                    }
                                </p>
                            </div>
                        </div>
                    ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 pr-4 mt-4 lg:mt-0">
          <div className="rounded-lg shadow-sm border p-4">
            <h2 className="text-2xl font-semibold">Order Summary</h2>
            <p className="flex justify-between items-center">
              <strong>Products: </strong>
              <span>
                ${formatCalculatePrice(totalPrice,1)}
              </span>
            </p>
            <p className="flex justify-between items-center">
              <strong>Tax{`(0%)`}: </strong>
              <span>
                    0.00
              </span>
            </p>
            <p className="flex justify-between items-center">
              <strong>Subtotal: </strong>
              <span>
                ${formatCalculatePrice(totalPrice,1)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
