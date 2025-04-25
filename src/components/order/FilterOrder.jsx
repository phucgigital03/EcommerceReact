import { Box, Paper, Typography, Divider, Grid, styled } from "@mui/material";

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
      default:
        break;
    }
  });

  console.log(filterOrder);
  return (
    <div className="mt-2">
      {filterOrder.length > 0 ? (
        filterOrder.map((order) => (
          <OrderCard key={order.orderId} elevation={1}>
            <Typography variant="h6" color="primary" gutterBottom>
              Order ID: {order.orderId}
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

            <Divider sx={{ my: 2 }} />

            {/* User show detail immedially */}
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
                          {product.quantity} x ${product.orderedProductPrice}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

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
    </div>
  );
}

export default FilterOrder;
