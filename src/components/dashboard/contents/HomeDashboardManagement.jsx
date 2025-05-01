import { useEffect, useState } from "react";
import BarGraph from "../../shared/Bar";
import LineGraph from "../../shared/Line";
import PieGraph from "../../shared/Pie";
import StatCard from "../../shared/Statcard";

import {
  FiBox,
  FiShoppingCart,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";
import { formatPrice } from "../../../utils/formatPrice";
import toast from "react-hot-toast";
import api from "../../../api/api";
import truncateText from "../../../utils/truncateText";

function HomeDashboardManagement() {
  const [stats, setStats] = useState([
    {
      title: "PRODUCTS",
      value: 0,
      bgColor: "#4CAF50",
      icon: <FiBox size={16} />,
      loading: false,
    },
    {
      title: "ORDERS",
      value: 0,
      bgColor: "#E57373",
      icon: <FiShoppingCart size={16} />,
      loading: false,
    },
    {
      title: "AVERAGE", // giá trị trung bình của mỗi đơn hàng
      value: formatPrice(0),
      bgColor: "#4FC3F7",
      icon: <FiDollarSign size={16} />,
      loading: false,
    },
    {
      title: "REVENUE",
      value: formatPrice(0),
      bgColor: "#FFD54F",
      icon: <FiTrendingUp size={16} />,
      loading: false,
    },
  ]);
  const [refresh, setRefresh] = useState(false);
  const [refreshMonthlyRevenue, setRefreshMonthlyRevenue] = useState(false);

  //  fetch Product Count
  useEffect(() => {
    console.log("fetch Product Count");
    const fetchProductCount = async () => {
      try {
        setStats((prevStat) => {
          prevStat[0].loading = true;
          return [...prevStat];
        });
        const { data } = await api.get("/public/products/count");
        setStats((prevStat) => {
          prevStat[0].value = data?.productCount || 0;
          return [...prevStat];
        });
      } catch (error) {
        console.log("Failed to fetch product count", error);
        toast.error("Failed to fetch product count");
      } finally {
        setStats((prevStat) => {
          prevStat[0].loading = false;
          return [...prevStat];
        });
      }
    };
    fetchProductCount();
  }, [refresh]);

  //  fetch Order Count
  useEffect(() => {
    console.log("fetch Order Count");
    const fetchOrderCount = async () => {
      try {
        setStats((prevStat) => {
          prevStat[1].loading = true;
          return [...prevStat];
        });
        const { data } = await api.get("/public/orders/count");
        setStats((prevStat) => {
          prevStat[1].value = data?.orderCount || 0;
          return [...prevStat];
        });
      } catch (error) {
        console.log("Failed to fetch order count", error);
        toast.error("Failed to fetch order count");
      } finally {
        setStats((prevStat) => {
          prevStat[1].loading = false;
          return [...prevStat];
        });
      }
    };
    fetchOrderCount();
  }, [refresh]);

  //  fetch Revenue
  useEffect(() => {
    console.log("fetch Revenue Count");
    const fetchOrderRevenue = async () => {
      try {
        setStats((prevStat) => {
          prevStat[3].loading = true;
          return [...prevStat];
        });
        const { data } = await api.get("/order/admin/revenue");
        //  calculate Average
        setStats((prevStat) => {
          prevStat[3].value = truncateText(
            formatPrice(data?.orderRevenue || 0),
            7
          );
          const average =
            prevStat[0].value > 0 ? data?.orderRevenue / data?.orderCount : 0;
          prevStat[2].value = truncateText(formatPrice(average), 7);
          return [...prevStat];
        });
      } catch (error) {
        console.log("Failed to fetch order revenue", error);
        toast.error("Failed to fetch order revenue");
      } finally {
        setStats((prevStat) => {
          prevStat[3].loading = false;
          return [...prevStat];
        });
      }
    };
    fetchOrderRevenue();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleRefreshMontlyRevenue = ()=>{
    setRefreshMonthlyRevenue(!refreshMonthlyRevenue);
  }

  console.log(stats);

  return (
    <div>
      <div className="general-statistical">
        <div className="flex justify-between items-center pb-6">
          <h1 className="text-2xl font-medium">Dashboard Overview</h1>
          <button
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <TfiReload className="mr-1" />
            Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              bgColor={stat.bgColor}
              icon={stat.icon}
              loading={stat.loading}
            />
          ))}
        </div>
      </div>

      <div className="charts h-auto">
        <div className="montlyRevenue mt-20 p-[20px] pb-[60px] shadow-lg">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-2xl font-medium">Montly revenue analysis</h1>
            <button
              onClick={handleRefreshMontlyRevenue}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <TfiReload className="mr-1" />
              Refresh
            </button>
          </div>
          <BarGraph refresh={refreshMonthlyRevenue} styleClass={"h-[400px]"} />
        </div>
        <div className="top10ProductsSellQickly mt-20 p-[20px] pb-[100px] shadow-lg">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-2xl font-medium">Top 10 produtcs sell quickly</h1>
            <button
              // onClick={handleRefresh}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <TfiReload className="mr-1" />
              Refresh
            </button>
          </div>
          <LineGraph styleClass={"h-[400px]"} />
        </div>
        <div className="registerMethod mt-20 p-[20px] pb-[60px] shadow-lg">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-2xl font-medium">Register method </h1>
            <button
              // onClick={handleRefresh}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <TfiReload className="mr-1" />
              Refresh
            </button>
          </div>
          <PieGraph styleClass={"h-[400px]"} />
        </div>
      </div>
    </div>
  );
}

export default HomeDashboardManagement;
