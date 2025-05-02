import { Pie } from "react-chartjs-2";
import { Chart as CHARTJS, Tooltip, Legend, ArcElement } from "chart.js";
import { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

CHARTJS.register(Tooltip, Legend, ArcElement);

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

function PieGraph({ styleClass, refresh }) {
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Method to register",
        data: [], // Corresponds to each platform above
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        hoverOffset: 4, // Lifts the segment on hover
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch revenue data when selected year changes
  useEffect(() => {
    const fetchRegisterMethods = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(
          `/users/registerMethod`
        );

        const signUpMethods = data.map((item) => item.signUpMethod);
        const count = data.map((item) => item.count);

        setPieChartData({
          labels: signUpMethods,
          datasets: [
            {
              label: "Method to register",
              data: count, // Corresponds to each platform above
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              hoverOffset: 4, // Lifts the segment on hover
            },
          ],
        });


      } catch (err) {
        console.log("Failed to load register method" + err.message);
        toast.error("Failed to load register method");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegisterMethods();
  }, [refresh]);

  return (
    <div className={styleClass ? styleClass : ""}>
      <Pie options={options} data={pieChartData} />
    </div>
  );
}

export default PieGraph;
