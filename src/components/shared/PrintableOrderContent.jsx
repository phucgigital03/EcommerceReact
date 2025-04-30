import React from "react";

// New component for the printable order confirmation
const PrintableOrderContent = React.forwardRef(({ order }, ref) => {
  if (!order) return null;
  console.log("PrintableOrderContent order:", order)
  console.log("PrintableOrderContent ref:", ref);
  return (
    <div ref={ref} className="print-content">
      <div className="print-header">
        <h1>Order Confirmation</h1>
        <h2>Order #{order.orderId}</h2>
        <p>Date: {order.orderDate}</p>
        <p>Status: {order.orderStatus}</p>
        <p>Hey,Order confirm has been sent via {order.email}</p>
        <p>Received Phone: {order.address.receivePhone}</p>
      </div>

      <div className="customer-info">
        <h3>Shipping Address</h3>
        <p>Street: {order.address.street}</p>
        <p>Building: {order.address.buildingName}</p>
        <p>City: {order.address.city}</p>
        <p>State: {order.address.state}</p>
        <p>Country: {order.address.country}</p>
      </div>

      <div className="order-items">
        <h3>Order Items</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>${item.orderedProductPrice}</td>
                <td>{item.quantity}</td>
                <td>${item.quantity * item.orderedProductPrice}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total:</td>
              <td>${order.totalAmount}</td>
            </tr>
            <tr>
              <td colSpan="3">Shipping Fee:</td>
              <td>$0</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="print-footer">
        <p>Thank you for your order!</p>
        <p>Please keep this receipt for your records.</p>
      </div>

      <style type="text/css" media="print">
        {`
            @page {
              size: auto;
              margin: 20mm;
            }
            
            body {
              font-family: Arial, sans-serif;
            }
            
            .print-header {
              text-align: center;
              margin-bottom: 30px;
            }
            
            .print-header h1 {
              font-size: 24px;
              margin-bottom: 5px;
            }
            
            .print-header h2 {
              font-size: 18px;
              margin-bottom: 10px;
            }
            
            .customer-info {
              margin-bottom: 30px;
            }
            
            .customer-info h3 {
              font-size: 16px;
              margin-bottom: 10px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
            }
            
            .order-items table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            
            .order-items th, 
            .order-items td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            
            .order-items th {
              background-color: #f2f2f2;
            }
            
            .order-items tfoot tr td {
              font-weight: bold;
            }
            
            .print-footer {
              margin-top: 50px;
              text-align: center;
              font-size: 14px;
            }
          `}
      </style>
    </div>
  );
});

PrintableOrderContent.displayName = "PrintableOrderContent";

export default PrintableOrderContent;
