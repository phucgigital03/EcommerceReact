import { Bar } from "react-chartjs-2";
import {
  Chart as CHARTJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import toast from "react-hot-toast";
import api from "../../api/api";

CHARTJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Monthly Revenue",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Revenue ($)",
      },
    },
  },
};

function BarGraph({ styleClass }) {
  const [monthlyData, setMonthlyData] = useState({
    labels: [],
    datasets: [
      {
        label: "Month",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Fetch available years
  useEffect(() => {
    const fetchAvailableYears = async () => {
      try {
        const {data} = await api.get('/revenue/availableyears');
        console.log(data)
        // setAvailableYears(response.data);
        // // Set default year to the most recent year if available
        // if (response.data.length > 0) {
        //   setSelectedYear(response.data[0]);
        // }
      } catch (err) {
        console.log("Failed to load available years: " + err.message);
        toast.error("Failed to load available years")
      }
    };
    fetchAvailableYears();
  }, []);

  // Fetch revenue data when selected year changes
  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/revenue/monthly?year=${selectedYear}`);
        
        const months = response.data.map(item => item.month);
        const revenues = response.data.map(item => item.revenue);
        
        setMonthlyData({
          labels: months,
          datasets: [
            {
              label: `${selectedYear} Revenue`,
              data: revenues,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.log("Failed to load monthly revenue data" + err.message);
        toast.error("Failed to load monthly revenue data")
      }finally{
        setIsLoading(false);
      }
    };
    
    if (selectedYear) {
      fetchMonthlyRevenue();
    }
  }, [selectedYear]);


  return (
    <div className={styleClass ? styleClass : ""}>
      <FormControl className="w-[120px]">
        <InputLabel id="year-select-label">Years</InputLabel>
        <Select
          className="h-[42px] ml-2"
          labelId="year-select-label"
          id="year-select"
          value={selectedYear}
          label="Years"
          onChange={handleYearChange}
        >
          <MenuItem key={"currentYear"} value={selectedYear}>
            {selectedYear}
          </MenuItem>
          {availableYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {isLoading ? (
        <div className="loading">Loading chart data...</div>
      ) : (
        <Bar options={options} data={monthlyData} />
      )}
    </div>
  );
}

export default BarGraph;
