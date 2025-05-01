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

const lineChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Steps By Alex",
      data: [4200, 5600, 4800, 6900, 7200, 8800, 9400],
      borderColor: "rgb(54, 162, 235)",
    },
    {
      label: "Steps By Alex's Friend",
      data: [3900, 6100, 5300, 5800, 6600, 9000, 9700],
      borderColor: "rgb(255, 99, 132)",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" },
    title: { display: true, text: "Healthy Chart" },
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

function LineGraph({ styleClass }) {
  return (
    <div className={styleClass ? styleClass : ""}>
      <Line options={options} data={lineChartData} />
    </div>
  );
}

export default LineGraph;
