import { useEffect, useState } from "react";
import { Box, Tabs, Tab, styled } from "@mui/material";
import {
  MdPendingActions,
  MdCheckCircle,
  MdLocalShipping,
  MdDeliveryDining,
  MdCancel,
} from "react-icons/md";
import Pending from "./OrderType/Pending";
import FilterOrder from "./FilterOrder";
import Accepted from "./OrderType/Accepted";
import Shipped from "./OrderType/Shipped";
import Delivered from "./OrderType/Delivered";
import Cancelled from "./OrderType/Cancelled";
import api from "../../api/api";
import Loader from "../shared/Loader";

const StatusTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiTab-root": {
    textTransform: "none",
    minWidth: 100,
  },
}));

// Sample data

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/order/user/orders");
        setOrders(data)
        setError(null);
      } catch (error) {
        console.log("Failed to fetch order history" + error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if(error){
    return <div>{error}</div>
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", p: 2 }}>
      <h2 className="text-2xl font-bold">All Orders</h2>
      <StatusTabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="order status tabs"
      >
        <Tab
          icon={<MdPendingActions size={20} />}
          iconPosition="start"
          label="Pending"
          value={0}
        />
        <Tab
          icon={<MdCheckCircle size={20} />}
          iconPosition="start"
          label="Accepted"
          value={1}
        />
        <Tab
          icon={<MdLocalShipping size={20} />}
          iconPosition="start"
          label="Shipped"
          value={2}
        />
        <Tab
          icon={<MdDeliveryDining size={20} />}
          iconPosition="start"
          label="Delivered"
          value={3}
        />
        <Tab
          icon={<MdCancel size={20} />}
          iconPosition="start"
          label="Cancelled"
          value={4}
        />
      </StatusTabs>

      {loading ? (
        <Loader />
      ) : tabValue === 0 ? (
        <Pending>
          <FilterOrder orderType={"Pending"} orders={orders} />
        </Pending>
      ) : tabValue === 1 ? (
        <Accepted>
          <FilterOrder orderType={"Accepted"} orders={orders} />
        </Accepted>
      ) : tabValue === 2 ? (
        <Shipped>
          <FilterOrder orderType={"Shipped"} orders={orders} />
        </Shipped>
      ) : tabValue === 3 ? (
        <Delivered>
          <FilterOrder orderType={"Delivered"} orders={orders} />
        </Delivered>
      ) : (
        <Cancelled>
          <FilterOrder orderType={"Cancelled"} orders={orders} />
        </Cancelled>
      )}
    </Box>
  );
};

export default Orders;
