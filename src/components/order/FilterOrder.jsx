import {
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  styled,
  Button,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoPrint } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import PrintableOrderContent from "../shared/PrintableOrderContent";

// Styled components
const OrderCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

const OrderDetail = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
}));

function FilterOrder({ orderType, orders = [] }) {
  console.log(orderType, orders);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderToPrint, setOrderToPrint] = useState(null);
  // Create a single ref for the component to print
  const printRef = useRef(null);

  const filterOrder = orders.filter((order) => {
    switch (orderType) {
      case "Pending":
        return order.orderStatus == "Order pending";

      case "Accepted":
        return order.orderStatus == "Order accepted";

      case "Shipped":
        return order.orderStatus == "Order shipped";

      case "Delivered":
        return order.orderStatus == "Order delivered";

      case "Cancelled":
        return order.orderStatus == "Order cancelled";
      case "All":
        return true;
      default:
        break;
    }
  });
  console.log(filterOrder);

  const handleView = (orderId) => {
    console.log(orderId);
    setSelectedOrderId((currentOrderId) => {
      if (currentOrderId == orderId) {
        return null;
      } else {
        return orderId;
      }
    });
  };

  // Set up react-to-print hook
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Order_${orderToPrint?.orderId}_Confirmation`,
    onBeforeGetContent: () => {
      console.log("Preparing print content...", printRef.current);
      // Make sure we have content to print
      if (!printRef.current) {
        return Promise.reject("No content to print");
      }
      return Promise.resolve();
    },
    onAfterPrint: () => {
      console.log("Print completed successfully!");
      // Clear the orderToPrint state after successful printing
      setTimeout(() => setOrderToPrint(null), 500);
    },
    onPrintError: (error) => {
      console.error("Print failed:", error);
      setOrderToPrint(null); // Reset order after print
    },
    removeAfterPrint: true
  });

  // This function sets which order to print and triggers the print
  const triggerPrint = (order) => {
    console.log("Setting order to print:", order.orderId);
    setOrderToPrint({...order});
  };

  // When orderToPrint changes, trigger the print operation
  // but only after ensuring the printRef has been populated
  useEffect(() => {
    if (orderToPrint && printRef.current) {
      // Add a small delay to ensure the component is fully rendered
      const timer = setTimeout(() => {
        console.log("Triggering print with ref:", printRef.current);
        try {
          handlePrint();
        } catch (error) {
          console.error("Print error:", error);
          // Reset the orderToPrint state to prevent potential memory leaks
          setOrderToPrint(null);
        }
      }, 300);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [orderToPrint]);

  return (
    <div className="mt-2">
      {filterOrder.length > 0 ? (
        filterOrder.map((order) => (
          <OrderCard key={order.orderId} elevation={1}>
            <Typography
              className="flex items-center justify-between"
              variant="h6"
              color="primary"
              gutterBottom
            >
              <p>Order ID: {order.orderId}</p>
              {
                <div className="flex gap-x-2 justify-end items-center">
                  <Button
                    className="min-w-[100px] w-[100px]"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleView(order.orderId);
                    }}
                  >
                    <FaEye />
                    <span className="ml-1">View</span>
                  </Button>
                  <Button
                    className="min-w-[100px] w-[100px]"
                    variant="contained"
                    color="error"
                    onClick={() => {
                      triggerPrint(order);
                    }}
                  >
                    <IoPrint />
                    <span className="ml-1">Print</span>
                  </Button>
                </div>
              }
            </Typography>

            <OrderDetail>
              <Typography variant="body1">
                Status: <strong>{order.orderStatus}</strong>
              </Typography>
            </OrderDetail>

            <OrderDetail>
              <Typography variant="body1" color="error">
                Total: <strong>${order.totalAmount}</strong>
              </Typography>
            </OrderDetail>

            <OrderDetail>
              <Typography variant="body2" color="text.secondary">
                Shipping Fee: ${0}
              </Typography>
            </OrderDetail>

            <OrderDetail>
              <Typography variant="body2" color="text.secondary">
                Date: {order.orderDate}
              </Typography>
            </OrderDetail>

            {/* User show detail immedially */}
            {order?.orderId == selectedOrderId && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="body1" gutterBottom>
                    Receive Address:
                  </Typography>

                  <Box sx={{ ml: 2, mb: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                      Street: {order.address.street}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Building: {order.address.buildingName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      City: {order.address.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      State: {order.address.state}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Country: {order.address.country}
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    {order.orderItems.map((product, index) => (
                      <Grid item xs={12} key={index}>
                        <Box
                          sx={{
                            display: "flex",
                            border: "1px solid #e0e0e0",
                            borderRadius: 1,
                          }}
                        >
                          <Box
                            component="img"
                            src={product.image}
                            alt={product.productName}
                            sx={{
                              width: 100,
                              height: 100,
                              objectFit: "contain",
                              backgroundColor: "#f5f5f5",
                            }}
                          />
                          <Box sx={{ flex: 1, p: 2 }}>
                            <Typography variant="h6" component="div">
                              {product.productName}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              {product.quantity} x $
                              {product.orderedProductPrice}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </>
            )}

            {/* 
              User show generall .Having View, Check actions
              View: show detail
              Check: can print Order
            */}
          </OrderCard>
        ))
      ) : (
        <div>No orders we can find</div>
      )}

      {/* Printable content component - IMPORTANT: Now only rendered when there's an order to print */}
      {orderToPrint && (
        <div style={{ display: "none" }}>
          <PrintableOrderContent ref={printRef} order={orderToPrint} />
        </div>
      )}
    </div>
  );
}

export default FilterOrder;
