import { Pie } from "react-chartjs-2";
import {
  Chart as CHARTJS,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

CHARTJS.register(
    Tooltip,
    Legend,
    ArcElement
);

const pieChartData = {
    labels: ["UserName&Password", "Google", "Github"],
    datasets: [
      {
        label: "Time Spent",
        data: [70,20,10], // Corresponds to each platform above
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        hoverOffset: 4, // Lifts the segment on hover
      },
    ],
  };

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

function PieGraph({ styleClass }) {
  return (
    <div className={styleClass ? styleClass : ""}>
      <Pie options={options} data={pieChartData} />
    </div>
  );
}

export default PieGraph;
