import { useEffect, useState } from "react";
import { Box, Tabs, Tab, styled, Typography } from "@mui/material";
import {
  MdPendingActions,
  MdCheckCircle,
  MdLocalShipping,
  MdDeliveryDining,
  MdCancel,
} from "react-icons/md";
import Pending from "../../order/OrderType/Pending";
import FilterOrder from "../../order/FilterOrder";
import Accepted from "../../order/OrderType/Accepted";
import Shipped from "../../order/OrderType/Shipped";
import Delivered from "../../order/OrderType/Delivered";
import Cancelled from "../../order/OrderType/Cancelled";
import Loader from "../../shared/Loader";
import Paginations from "../../shared/Paginations";
import { useSearchParams } from "react-router-dom";
import api from "../../../api/api";
import All from "../../order/OrderType/All";
import { GrMultiple } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

const StatusTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiTab-root": {
    textTransform: "none",
    minWidth: 100,
  },
}));

function OrderManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams();
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    params.set("pageNumber", currentPage - 1);
    const sizePage = searchParams.get("pageSize")
      ? Number(searchParams.get("pageSize"))
      : 5;
    params.set("pageSize", sizePage);

    const sortOrder = searchParams.get("sortOrder") || "desc";
    params.set("sortBy", "orderDate");
    params.set("sortOrder", sortOrder);

    const queryString = params.toString();
    console.log("query string", queryString);

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/order/admin/orders?${queryString}`);
        setOrders(data?.content ? data?.content : []);
        setPagination({
          ...pagination,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          lastPage: data.lastPage,
        });
        setError(null);
      } catch (error) {
        console.log("Failed to fecth orders: ", error?.message);
        setError("Failed to fecth orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [searchParams]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ margin: "0 auto", p: 2 }}>
      <Typography sx={{ mb: "0" }} variant="h4" gutterBottom>
        All orders
      </Typography>
      {/* search bar */}
      <div className="relative mt-2 mb-2 flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          value={""}
          onChange={(e) => {
            // setSearchTerm(e.target.value);
          }}
          className="border border-gray-400 text-slate-600 rounded-md py-2 pl-10 pr-6 w-full focus:outline focus:ring-2"
          type="text"
          placeholder="Search Orders"
        />
        <FiSearch className="absolute left-3 text-slate-800 size={30}" />
      </div>
      <StatusTabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="order status tabs"
      >
        <Tab
          icon={<GrMultiple size={20} />}
          iconPosition="start"
          label="All"
          value={0}
        />
        <Tab
          icon={<MdPendingActions size={20} />}
          iconPosition="start"
          label="Pending"
          value={1}
        />
        <Tab
          icon={<MdCheckCircle size={20} />}
          iconPosition="start"
          label="Accepted"
          value={2}
        />
        <Tab
          icon={<MdLocalShipping size={20} />}
          iconPosition="start"
          label="Shipped"
          value={3}
        />
        <Tab
          icon={<MdDeliveryDining size={20} />}
          iconPosition="start"
          label="Delivered"
          value={4}
        />
        <Tab
          icon={<MdCancel size={20} />}
          iconPosition="start"
          label="Cancelled"
          value={5}
        />
      </StatusTabs>

      {loading ? (
        <Loader />
      ) : tabValue === 0 ? (
        <All>
          <FilterOrder orderType={"All"} orders={orders} />
        </All>
      ) : tabValue === 1 ? (
        <Pending>
          <FilterOrder orderType={"Pending"} orders={orders} />
        </Pending>
      ) : tabValue === 2 ? (
        <Accepted>
          <FilterOrder orderType={"Accepted"} orders={orders} />
        </Accepted>
      ) : tabValue === 3 ? (
        <Shipped>
          <FilterOrder orderType={"Shipped"} orders={orders} />
        </Shipped>
      ) : tabValue === 4 ? (
        <Delivered>
          <FilterOrder orderType={"Delivered"} orders={orders} />
        </Delivered>
      ) : (
        <Cancelled>
          <FilterOrder orderType={"Cancelled"} orders={orders} />
        </Cancelled>
      )}

      <div className="flex justify-center pt-10">
        <Paginations
          numberOfPage={pagination?.totalPages}
          totalElements={pagination?.totalElements}
        />
      </div>
    </Box>
  );
}

export default OrderManagement;
