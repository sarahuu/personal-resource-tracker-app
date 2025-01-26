import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const WaterLogChart = () => {
  const [filter, setFilter] = useState("week"); // Filter state: "daily" or "monthly"
  const [waterLogData, setWaterLogData] = useState([]); // Data for the chart
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true); // Set loading to true
    setError(null); // Reset error state

    try {
      const response = await axiosInstance.get(
        `/water-logs/logs-by-${filter}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setWaterLogData(response.data); // Update state with the fetched data
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load water logs. Please try again.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Fetch data when the component mounts or the filter changes
  useEffect(() => {
    fetchData();
  }, [filter]);

  // Handle dropdown change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-100">
          Water Logs {filter === "week" ? "for Current Week" : "for Current Year"}
        </h2>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="bg-gray-700 text-gray-100 border border-gray-600 p-1 text-sm rounded-md"
        >
          <option value="week">Current Week</option>
          <option value="month">Monthly</option>
        </select>
      </div>
      <div className="h-80">
        {loading ? (
          <p className="text-center text-gray-100">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={waterLogData}>
              <CartesianGrid strokeDasharray={"3 3"} stroke="#485563" />
              <XAxis dataKey={"name"} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#485563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Line
                type={"monotone"}
                dataKey={"qty"}
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default WaterLogChart;
