import { Line } from "react-chartjs-2";
import {
  Chart as CHARTJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { isRangeValidTime } from "../../utils/checkDistanceTime";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" },
    title: { display: true, text: "Product sell the most quantity" },
  },
};

CHARTJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Color palette for the chart lines
const COLORS = [
  "rgba(75, 192, 192, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(199, 199, 199, 1)",
  "rgba(83, 102, 255, 1)",
  "rgba(78, 205, 196, 1)",
  "rgba(255, 99, 71, 1)",
];

function LineGraph({ styleClass }) {
  const [fromDate, setFromDate] = useState(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return oneWeekAgo;
  });
  const [toDate, setToDate] = useState(new Date());
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorTime,setErrorTime] = useState("");

  useEffect(() => {
    if(!isRangeValidTime(fromDate,toDate,120)){
        toast.error("Please select days not exceed 120 days");
        setErrorTime("Please select days not exceed 120 days")
        return;
    }
    setErrorTime("");
    fetchChartData();
  }, [fromDate, toDate]);

  const fetchChartData = async () => {
    try {
      const start = fromDate.toISOString().split("T")[0];
      const end = toDate.toISOString().split("T")[0];

      setIsLoading(true);
      const { data } = await api.get(
        `/products/top-products?startDate=${start}&endDate=${end}`
      );

      const rawData = data;

      const labels = rawData.map((entry) => entry.date);

      console.log(labels);

      // Dynamically extract dataset keys (product names)
      const productNames = Object.keys(rawData[0] || {}).filter(
        (key) => key !== "date"
      );

      const datasets = productNames.map((name, index) => ({
        label: name,
        data: rawData.map((entry) => entry[name] || 0),
        borderColor: COLORS[index % COLORS.length], // de tranh viec data vuot qua COLORS
        fill: false,
      }));

      setLineChartData({ labels, datasets });
    } catch (err) {
      console.log("Failed to top 10 products sell quickly" + err.message);
      toast.error("Failed to top 10 products sell quickly");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styleClass ? styleClass : ""}>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            From Date
          </label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="dd/MM/yyyy"
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            To Date
          </label>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat="dd/MM/yyyy"
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {errorTime && <p className="text-red-500 text-center">*{errorTime}</p>}
      </div>
      <Line options={options} data={lineChartData} />
    </div>
  );
}

export default LineGraph;
